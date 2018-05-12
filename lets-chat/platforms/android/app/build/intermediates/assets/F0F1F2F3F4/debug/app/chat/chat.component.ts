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
import { Config } from '../core/index';

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
    this.getMessages();
  }

  getMessages() {
    const selectQuery = 'SELECT * FROM messages WHERE contact = ?';
    (new Sqlite(Config.dbName)).then((db) => {
      db.all(selectQuery, [this.chat.number]).then((rows) => {
        this.messages = [];
        // tslint:disable-next-line:forin
        for (const row in rows) {
          const messageJson = {
            text: '',
            sender: '',
            sent: '',
            created: '',
          };
          messageJson.text = rows[row][1];
          if (rows[row][2] === 1) {
            messageJson.sender = null;
          } else {
            messageJson.sender = this.chat.contact;
          }
          messageJson.created = rows[row][6];
          messageJson.sent = rows[row][7];
          this.messages.push(messageJson);
        }
      }, (error) => {
        // tslint:disable-next-line:no-console
        console.log('SELECT ERROR', error);
      });
    });
  }
  recieveMessage($event) {
    const textMessage = $event;
    this.chat.text = textMessage;
    this.getMessages();
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
    }, 1000);
  }
  private subscribeToData(): void {
    // tslint:disable-next-line:max-line-length
    this.timerSubscription = Observable.timer(100).first().subscribe(() => this.getMessages());
  }
}
