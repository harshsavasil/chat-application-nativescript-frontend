import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import * as Toast from 'nativescript-toast';
import { ChatsService } from '../../core/chats.service';

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
  ) {
  }
  sendMessage(args) {
    const myTextField = args.object;
    myTextField.dismissSoftInput();
    const data = {
      to: this.contact,
      from: this.user,
      text: this.textMessage,
      sent_time: Date.now(),
    };
    this.chatsService.sendMessage(data)
      .subscribe(
        (success) => {
          if (success.result === 1) {
            Toast.makeText('Message Sent Successfully.').show();
            this.addMessageToChat();
          } else {
            alert(success.message);
          }
        },
        (error) => alert(error.message),
    );
  }
  addMessageToChat() {
    this.messageEvent.emit(this.textMessage);
    this.textMessage = '';
  }
}
