import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getString, setString } from 'application-settings';
// tslint:disable-next-line:no-var-requires
const Sqlite = require('nativescript-sqlite');
import * as PushNotifications from 'nativescript-push-notifications';
import { DataBaseService } from './core/index';
import { Config } from './core/index';

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  private database: any;
  private pushSettings = {
    senderID: Config.fcmSenderID,
    // tslint:disable-next-line:max-line-length
    notificationCallbackAndroid: (stringifiedData: string, fcmNotification: any) => {
      const notificationBody = fcmNotification && fcmNotification.getBody();
      alert('Message received!\n' + notificationBody + '\n' + stringifiedData);
      const messageJSON = JSON.parse(stringifiedData);
      if (messageJSON.created_time) {
        const insertMsgJson = {
          sender: 0,
          created: messageJSON.created_time,
          contact: messageJSON.from,
          sent: 2,
          text: messageJSON.text,
          message_id: messageJSON._id,
        };
        this.databaseService.insertIntoMessagesWithMessageId(insertMsgJson);
      }
      if (messageJSON.delivered_time) {
        this.databaseService.updateStatusOfMessage(2, messageJSON.unique_id);
        this.databaseService.updateDeliveryTimeOfMessage(
          messageJSON.delivered_time, messageJSON.unique_id);
      }
    },
  };
  constructor(
    private router: Router,
    private databaseService: DataBaseService,
  ) {
    const userId = getString('userId');
    if (userId) {
      this.router.navigate(['/home']);
    }
    this.databaseService.createTables();
    PushNotifications.register(this.pushSettings, (token: string) => {
      setString('pushToken', token);
    }, (error) => {
      alert(error);
    });
  }
}
