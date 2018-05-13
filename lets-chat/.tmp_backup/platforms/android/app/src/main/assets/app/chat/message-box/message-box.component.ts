import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import * as Toast from 'nativescript-toast';
import { ChatsService } from '../../core/chats.service';
import { DataBaseService } from '../../core/database.service';

@Component({
  moduleId: module.id,
  selector: 'ns-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
})
export class MessageBoxComponent {
  textMessage = '';
  @Input() user: string;
  @Input() contact: string;
  @Output() messageEvent = new EventEmitter<string>();
  constructor(
    @Inject('platform') public platform,
    private chatsService: ChatsService,
    private databaseService: DataBaseService,
  ) {
  }
  sendMessage(args) {
    const myTextField = args.object;
    myTextField.dismissSoftInput();
    const data = {
      text: this.textMessage,
      sender: 1,
      contact: this.contact,
      sent: 0,
      created: Date.now(),
    };
    this.databaseService.insertIntoMessages(data);
    this.addMessageToChat();
  }
  addMessageToChat() {
    this.messageEvent.emit(this.textMessage);
    this.textMessage = '';
  }
}
