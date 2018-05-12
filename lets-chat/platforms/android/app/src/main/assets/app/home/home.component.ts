import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clear, getString, remove, setString } from 'application-settings';
import * as PushNotifications from 'nativescript-push-notifications';
import { Observable } from 'rxjs/Observable';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { ChatsService } from '../core/chats.service';
import { DataBaseService } from '../core/database.service';
import { Config } from '../core/index';
// tslint:disable-next-line:no-var-requires
const Sqlite = require('nativescript-sqlite');

@Component({
  moduleId: module.id,
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private lastMessageSyncTime: string;
  private userNumber: any;
  private timerSubscription: AnonymousSubscription;
  private pushTokenSubscription: AnonymousSubscription;
  private chatstimerSubscription: AnonymousSubscription;
  private chatsSubscription: AnonymousSubscription;
  private messagesSubscription: AnonymousSubscription;
  private unsentMessagesSubscription: AnonymousSubscription;

  constructor(
    @Inject('platform') public platform,
    private chatsService: ChatsService,
    private router: Router,
    private databaseService: DataBaseService,
  ) {
    this.userNumber = getString('userId');
    this.save_push_token();
    this.getChatsFromService();
    this.pushUnsentMessagesToServer();
  }
  logout() {
    clear();
    this.router.navigate(['/login']);
  }
  save_push_token() {
    const pushToken = getString('pushToken');
    const data = {
      token: pushToken,
      user_id: this.userNumber,
    };
    const url = Config.apiUrl + Config.savePushTokenUrl;
    if (this.userNumber && pushToken) {
      this.pushTokenSubscription =
        this.chatsService.commonPostService(url, data).subscribe((success) => {
          this.destroyTimerOfPushToken();
        }, (error) => {
          this.subscribeToData();
          alert(error.message);
        });
    }
  }
  destroyTimerOfPushToken(): void {
    if (this.pushTokenSubscription) {
      this.pushTokenSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  getChatsFromService() {
    this.chatsSubscription = this.chatsService.getAllChats(this.userNumber)
      .subscribe((chats) => {
        chats.forEach((chat) => {
          this.databaseService.insertIntoChats(chat);
        });
        this.subscribeToChatsData();
        // tslint:disable-next-line:max-line-length
      }, (error) => {
        alert('Could not fetch contacts list.');
      });
  }
  // getChatMessagesFromService() {
  //   this.lastMessageSyncTime = getString('lastMessageSyncTime', '0');
  //   this.messagesSubscription = this.chatsService.getChatMessages(
  //     this.userNumber, this.lastMessageSyncTime)
  //     .subscribe((messagesJson) => {
  //       const messagesResponse = messagesJson.messages;
  //       messagesResponse.forEach((message) => {
  //         this.databaseService.insertIntoMessages(message);
  //       });
  //       const currentTime = Date.now();
  //       setString('lastMessageSyncTime', currentTime.toString());
  //       this.subscribeToMessagesData();
  //     }, (error) => {
  //       alert(error.message);
  //     });
  // }
  pushUnsentMessagesToServer() {
    const selectQuery = 'SELECT * FROM messages WHERE sent = 0 LIMIT 1';
    while (true) {
      (new Sqlite(Config.dbName)).then((db) => {
        db.each(selectQuery).then((row) => {
          const data = {
            unique_id: row[0],
            to: row[8],
            from_id: this.userNumber,
            text: row[1],
            created_time: row[6],
          };
          // tslint:disable-next-line:max-line-length
          this.unsentMessagesSubscription = this.chatsService.sendMessage(data)
            .subscribe((success) => {
              if (success.result === 1) {
                this.databaseService.updateStatusOfMessage(
                  success.status, success.unique_id);
                if (success.message_timings.sent_time) {
                  this.databaseService.updateSentTimeOfMessage(
                    success.message_timings.sent_time, success.unique_id);
                }
                if (success.message_timings.delivered_time) {
                  this.databaseService.updateDeliveryTimeOfMessage(
                    success.message_timings.sent_time, success.unique_id);
                }
                if (success.message_id) {
                  this.databaseService.updateMessaeIdOfMessage(
                    success.message_id, success.unique_id);
                }
              }
            }, (error) => {
              this.databaseService.updateStatusOfMessage(
                error.status, error.unique_id);
            });
        }, (error) => {
          // tslint:disable-next-line:no-console
          console.log('Unable to fetch unsent messages', error);
        });
      }, (dbErr) => {
        // tslint:disable-next-line:no-console
        console.log(dbErr);
      });
    }
  }
  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(1000).first()
      .subscribe(() => this.save_push_token());
  }
  private subscribeToChatsData(): void {
    this.chatstimerSubscription = Observable.timer(1000).first()
      .subscribe(() => this.getChatsFromService());
  }
  private subscribeToUnsentMessagesData(): void {
    this.unsentMessagesSubscription = Observable.timer(500).first()
      .subscribe(() => this.pushUnsentMessagesToServer());
  }
}
