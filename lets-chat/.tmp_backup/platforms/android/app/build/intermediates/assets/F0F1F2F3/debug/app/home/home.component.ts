import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getString, remove, setString } from 'application-settings';
import * as PushNotifications from 'nativescript-push-notifications';
import { ChatsService } from '../core/chats.service';
import { Config } from '../core/index';
@Component({
    moduleId: module.id,
    selector: 'ns-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private userNumber: any;
  constructor(
    @Inject('platform') public platform,
    private chatsService: ChatsService,
    private router: Router,
  ) {}
  logout() {
    remove('userId');
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
      this.chatsService.commonPostService(url, data).subscribe((success) => {
        // Toast.makeText('Welcome !!').show();
      }, (error) => {
        alert(error.message);
      });
    }
  }
}
