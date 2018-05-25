import { Component, OnInit } from '@angular/core';

import { MessageService } from '../service/message.service';
import { Message, MessageType } from '../model/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public recievedMessage: Message[] = [];

  constructor(
    private message: MessageService
  ) { }

  ngOnInit() {
    this.message.getMessage().subscribe(
      (ms: Message) => {
        if (!ms) {
          this.recievedMessage = [];
          return;
        }
        this.recievedMessage.push(ms);
      }
    );
  }

  removeMessage(message: Message) {
    this.recievedMessage = this.recievedMessage.filter( msg => msg !== message );
  }

  cssClass(message: Message) {
    if (!message) {
        return;
    }
    // classe de alerta do bootstrap
    switch (message.type) {
        case MessageType.success:
            return 'alert alert-success';
        case MessageType.error:
            return 'alert alert-danger';
        case MessageType.info:
            return 'alert alert-info';
        case MessageType.warning:
            return 'alert alert-warning';
    }
  }

}
