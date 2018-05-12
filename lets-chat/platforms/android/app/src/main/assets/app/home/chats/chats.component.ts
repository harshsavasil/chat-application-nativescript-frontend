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
import { Config } from '../../core/config';
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
    this.getChats();
  }
  // fetch data from db
  getChats() {
    (new Sqlite(Config.dbName)).then((db) => {
      db.all('SELECT * FROM contacts').then((rows) => {
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
        db.close();
      }, (error) => {
        // tslint:disable-next-line:no-console
        console.log('SELECT ERROR', error);
      });
    }, (error) => {
      console.log('Unable to connect to DB');
    });
    this.subscribeToData();
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
    this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.getChats());
  }
}
