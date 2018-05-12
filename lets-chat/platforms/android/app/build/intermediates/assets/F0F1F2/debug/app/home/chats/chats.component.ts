import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { getString, remove } from 'application-settings';
import { registerElement } from 'nativescript-angular';
import { RouterExtensions } from 'nativescript-angular/router';
import { PullToRefresh } from 'nativescript-pulltorefresh';
import { Observable } from 'rxjs/Observable';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { ChatsService } from '../../core';
// tslint:disable-next-line:no-var-requires
const Sqlite = require('nativescript-sqlite');
// tslint:disable-next-line:max-line-length
registerElement('pullToRefresh', () => require('nativescript-pulltorefresh').PullToRefresh);

@Component({
  moduleId: module.id,
  selector: 'ns-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent {
  chats = [];
  userNumber = '';
  private timerSubscription: AnonymousSubscription;
  private chatsSubscription: AnonymousSubscription;
  private database: any;
  constructor(
    private chatsService: ChatsService,
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute,
  ) {
    this.userNumber = getString('userId');
    (new Sqlite('chat.db')).then((db) => {
      // tslint:disable-next-line:max-line-length
      const sqlQuery = 'CREATE TABLE IF NOT EXISTS contacts ( number TEXT PRIMARY KEY, name TEXT, avatar TEXT, text TEXT,type TEXT, muted INTEGER, lastSeen FLOAT, unread INTEGER, last_message_timestamp FLOAT )';
      db.execSQL(sqlQuery).then((id) => {
        this.database = db;
        this.getChatsFromService();
      }, (error) => {
        // tslint:disable-next-line:no-console
        console.log('CREATE TABLE ERROR', error);
      });
    }, (error) => {
      // tslint:disable-next-line:no-console
      console.log('OPEN DB ERROR', error);
    });
  }
  // fetch data from db
  getChats() {
    this.database.all('SELECT * FROM contacts').then((rows) => {
      this.chats = [];
      // tslint:disable-next-line:forin
      for (const row in rows) {
        this.chats.push({
          number: rows[row][0],
          contact: {
            name: rows[row][1],
            avatar: rows[row][2],
          },
          text: rows[row][3],
          type: rows[row][4],
          muted: rows[row][5],
          when: rows[row][6],
          unread: rows[row][7],
          last_message_timestamp: rows[row][8],
        });
      }
    }, (error) => {
      // tslint:disable-next-line:no-console
      console.log('SELECT ERROR', error);
    });
  }
  getChatsFromService() {
    this.chatsSubscription = this.chatsService.getAllChats(this.userNumber)
      .subscribe((chats) => {
        // tslint:disable-next-line:max-line-length
        const insertQuery = `
          INSERT INTO contacts
          ( number, name, avatar, text, type, muted,
            lastSeen, unread, last_message_timestamp )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const updateQuery = `
          UPDATE contacts
          SET number = ?, name = ?,
          avatar =?, text = ?, type = ?, muted = ?, lastSeen = ?, unread = ?,
          last_message_timestamp = ?
          WHERE number = ?
        `;
        chats.forEach((chat) => {
          const insertJSON = [];
          insertJSON.push(chat.number);
          insertJSON.push(chat.contact.name);
          insertJSON.push(chat.contact.avatar);
          insertJSON.push(chat.text);
          insertJSON.push(chat.type);
          insertJSON.push(chat.muted);
          insertJSON.push(chat.when);
          insertJSON.push(chat.unread);
          insertJSON.push(chat.last_message_timestamp);
          this.database.execSQL(insertQuery, insertJSON).then((id) => {
            // tslint:disable-next-line:no-console
            console.log('INSERT RESULT', id);
          }, (error) => {
            // tslint:disable-next-line:no-console
            console.log('INSERT ERROR', error);
            const updateJSON = insertJSON;
            updateJSON.push(chat.number);
            this.database.execSQL(updateQuery, updateJSON).then((id) => {
              // tslint:disable-next-line:no-console
              console.log('UPDATE RESULT Chats', id);
            }, (err) => {
              // tslint:disable-next-line:no-console
              console.log('UPDATE ERROR', err);
            });
          });
        });
        this.subscribeToData();
        this.getChats();
      });
  }
  goToChat(args) {
    const extras: NavigationExtras = {
      queryParams: {
        unread: this.chats[args.index].unread,
        chatJson: JSON.stringify(this.chats[args.index]),
      },
    };
    // this.ngOnDestroy();
    this.routerExtensions.navigate([
      'chat',
      args.index,
    ], extras);
  }
  refreshMe(args: any) {
    setTimeout(() => {
      this.getChats();
      (args.object as PullToRefresh).refreshing = false;
    }, 2000);
  }
  ngOnDestroy(): void {
    if (this.chatsSubscription) {
      this.chatsSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  private subscribeToData(): void {
    // tslint:disable-next-line:max-line-length
    this.timerSubscription = Observable.timer(60000).first().subscribe(() => this.getChatsFromService());
  }
}
