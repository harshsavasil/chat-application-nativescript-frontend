import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Inject, OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getString } from 'application-settings';
import { registerElement } from 'nativescript-angular';
import { RouterExtensions } from 'nativescript-angular/router';
import { PullToRefresh } from 'nativescript-pulltorefresh';
import { Observable } from 'rxjs/Observable';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { Chat, ChatsService, Contact } from '../core';
import { Message } from '../core/models/message.model';
// tslint:disable-next-line:no-var-requires
const Sqlite = require('nativescript-sqlite');
// tslint:disable-next-line:max-line-length
// registerElement('pullToRefresh', () => require('nativescript-pulltorefresh').PullToRefresh);

@Component({
  moduleId: module.id,
  selector: 'ns-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  chatIndex: number;
  chat: any;
  unread: number;
  messages = [];
  userNumber: string;
  lastSeenTime: any;
  private timerSubscription: AnonymousSubscription;
  private MessageSubscription: AnonymousSubscription;
  private database: any;
  constructor(
    private route: ActivatedRoute,
    private chatsService: ChatsService,
    private router: RouterExtensions,
    private ref: ChangeDetectorRef,
    @Inject('platform') public platform,
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.unread = +params.unread;
      this.chat = JSON.parse(params.chatJson);
      this.lastSeenTime = this.chat.when;
    });
    this.userNumber = getString('userId');
    (new Sqlite('chat.db')).then((db) => {
      // tslint:disable-next-line:max-line-length

      // tslint:disable-next-line:max-line-length
      const sqlQuery = `CREATE TABLE IF NOT EXISTS messages (text TEXT, sender INTEGER, created FLOAT, sent INTEGER, contact TEXT, PRIMARY KEY (text, sender, contact, created))`;
      // const sqlQuery = `TRUNCATE TABLE messages IF EXISTS`;
      db.execSQL(sqlQuery).then((id) => {
        this.database = db;
        this.getChatMessagesFromService();
      }, (error) => {
        // tslint:disable-next-line:no-console
        console.log('CREATE TABLE ERROR', error);
      });
    }, (error) => {
      // tslint:disable-next-line:no-console
      console.log('OPEN DB ERROR', error);
    });
    // this.getMessages();
    // this.readMessage();
  }

  getMessages() {
    const selectQuery = 'SELECT * FROM messages WHERE contact = ?';
    this.database.all(selectQuery, [this.chat.number]).then((rows) => {
      this.messages = [];
      // tslint:disable-next-line:forin
      for (const row in rows) {
        const messageJson = {
          text: '',
          sender: '',
          sent: '',
          created: '',
        };
        messageJson.text = rows[row][0];
        if (rows[row][1] === 1) {
          messageJson.sender = null;
        } else {
          messageJson.sender = this.chat.contact;
        }
        messageJson.created = rows[row][2];
        messageJson.sent = rows[row][3];
        this.messages.push(messageJson);
      }
    }, (error) => {
      // tslint:disable-next-line:no-console
      console.log('SELECT ERROR', error);
    });
  }
  getChatMessagesFromService() {
    this.chatsService.getChatMessages(
      this.userNumber, this.chat.number)
      .subscribe((messagesJson) => {
        const messagesResponse = messagesJson.messages;
        const insertQuery = `
          INSERT INTO messages
          ( text, sender, created, sent, contact)
          VALUES (?, ?, ?, ?, ?)`;
        const updateQuery = `
          UPDATE messages
          SET text = ?, sender = ?, created = ?, sent = ?, contact = ?
          WHERE text = ?, sender = ?, created = ?, contact = ?
        `;
        messagesResponse.forEach((message) => {
          const insertJSON = [];
          insertJSON.push(message.text);
          insertJSON.push(message.sender);
          insertJSON.push(message.created);
          insertJSON.push(message.sent);
          insertJSON.push(this.chat.number);
          this.database.execSQL(insertQuery, insertJSON).then((id) => {
            // tslint:disable-next-line:no-console
            console.log('INSERT RESULT', id);
          }, (error) => {
            // tslint:disable-next-line:no-console
            console.log('INSERT ERROR', error);
            const updateJSON = insertJSON;
            updateJSON.push(message.text);
            updateJSON.push(message.sender);
            updateJSON.push(message.created);
            updateJSON.push(this.chat.number);
            this.database.execSQL(updateQuery, updateJSON).then((id) => {
              // tslint:disable-next-line:no-console
              console.log('UPDATE RESULT', id);
            }, (err) => {
              // tslint:disable-next-line:no-console
              console.log('UPDATE ERROR', err);
            });
          });
        });
        this.subscribeToData();
        this.getMessages();
      }, (error) => {
        alert(error.message);
      });
  }
  recieveMessage($event) {
    const textMessage = $event;
    this.chat.text = textMessage;
    this.messages.push({
      text: textMessage,
      chat: this.chat,
      sender: null,
      created: Date.now(),
      sent: 2,
    });
  }
  readMessage() {
    const data = {
      user_id: this.userNumber,
      contact_id: this.chat.number,
    };
    this.chatsService.readMessages(data)
      .subscribe((success) => {
        // tslint:disable-next-line:no-console
        console.log('Message read reciepts.');
      }, (error) => {
        // tslint:disable-next-line:no-console
        console.log('Issue in Message Reading.');
      });
  }

  goBack() {
    this.router.back();
  }
  refreshMe(args: any) {
    setTimeout(() => {
      this.getMessages();
      (args.object as PullToRefresh).refreshing = false;
    }, 2000);
  }
  private subscribeToData(): void {
    // tslint:disable-next-line:max-line-length
    this.timerSubscription = Observable.timer(500).first().subscribe(() => this.getChatMessagesFromService());
  }
}
