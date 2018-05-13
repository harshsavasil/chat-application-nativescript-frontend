import { Injectable } from '@angular/core';

import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { LoadingIndicator } from 'nativescript-loading-indicator';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Config } from './index';
import { Chat } from './models/chat.model';
import { Message } from './models/message.model';
import { SentStatus } from './models/sent-status.model';

@Injectable()
export class ChatsService {
  constructor(private http: Http) { }
  getLoaderOptions() {
    return {
      message: 'Loading...',
      progress: 0.65,
      android: {
        indeterminate: true,
        cancelable: true,
        cancelListener(dialog) {
          // tslint:disable-next-line:no-console
          console.log('Loading cancelled');
        },
        max: 100,
        progressNumberFormat: '%1d/%2d',
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1,
      },
    };
  }
  login(mobile, password) {
    const params = new URLSearchParams();
    params.append('mobile', mobile);
    params.append('password', password);
    const loader = new LoadingIndicator();
    loader.show(this.getLoaderOptions());
    return this.http.get(
      Config.apiUrl + 'login/', {
        headers: this.getCommonHeaders(),
        params,
      },
    )
      .map((response) => response.json())
      .map((data) => {
        loader.hide();
        return data;
      })
      .catch(this.handleErrors);
  }
  signup(data) {
    const loader = new LoadingIndicator();
    loader.show(this.getLoaderOptions());
    return this.http.post(
      Config.apiUrl + 'signup/',
      JSON.stringify(data),
      { headers: this.getCommonHeaders() },
    )
      .map((res) => res.json())
      .map((res) => {
        loader.hide();
        return res;
        // return new Grocery(data._id, name);
      })
      .catch(this.handleErrors);
  }
  getAllChats(mobile) {
    const chatsList = [];
    const params = new URLSearchParams();
    params.append('mobile', mobile);
    return this.http.get(
      Config.apiUrl + 'contact_list/', {
        headers: this.getCommonHeaders(),
        params,
      })
      .map((res) => res.json())
      .map((data) => {
        data.forEach((chat) => {
          chatsList.push(chat);
        });
        return chatsList;
      })
      .catch(this.handleErrors);
  }
  getMessages(chat: any): Message[] {
    return Array(200).fill('').map((ele, idx) => ({
      // Non-sense phrases
      text: [
        '\u263A Yay, this course is amazing !!! \u270C',
        'Sixty-four doesn\'t like paying taxes.',
        'A river a thousand paces wide ever stuns the onlooker.',
        'That stolen figurine is often one floor above you.',
        '\u263A Yay, this course is amazing !!! \u270C',
        'Spam sat down once more!',
        'Whiskey on the table set a treehouse on fire.',
        'That memory we used to share stole the goods.',
        'Clear water rains heavily',
        'Style is interdependant on the relatedness of ' +
        'motivation, subcultures, and management',
      ][Math.floor(Math.random() * 10)],
      chat,
      sender: Math.random() > .5 ? chat.contact : null,
      created: Date.now() - ((idx + 1) * 40 * 60 * 1000),
      sent: Math.floor(4 * Math.random()),
    }));
  }
  getChatMessages(user, contact) {
    const messages = [];
    const params = new URLSearchParams();
    params.append('user_id', user);
    params.append('contact_id', contact);
    const response = this.http.get(
      Config.apiUrl + 'retrieve_chats/', {
        headers: this.getCommonHeaders(),
        params,
      })
      .map((res) => res.json())
      // .map((data) => {
      //   data.forEach((message) => {
      //     messages.push(message);
      //   });
      //   return messages;
      // })
      .catch((err) => this.handleErrors(err));
    return response;
  }

  sendMessage(data) {
    return this.http.post(
      Config.apiUrl + 'send_message/',
      JSON.stringify(data),
      { headers: this.getCommonHeaders() },
    )
      .map((res) => res.json())
      .map((res) => {
        return res;
      })
      .catch(this.handleErrors);
  }
  readMessages(data) {
    return this.http.post(
      Config.apiUrl + 'read_message/',
      JSON.stringify(data),
      { headers: this.getCommonHeaders() },
    )
      .map((res) => res.json())
      .map((res) => {
        return res;
      })
      .catch(this.handleErrors);
  }
  getCommonHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  handleErrors(error: Response) {
    return Observable.throw(error.json());
  }
}
