import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getString, setString } from 'application-settings';
// tslint:disable-next-line:no-var-requires
const Sqlite = require('nativescript-sqlite');
import * as PushNotifications from 'nativescript-push-notifications';
import * as Dialogs from 'ui/dialogs';
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
      // tslint:disable-next-line:max-line-length
      Dialogs.alert('Message received!\n' + notificationBody + '\n' + stringifiedData);
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
