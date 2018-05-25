import { Injectable } from '@angular/core';

import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

import { Message, MessageType } from '../model/message.model';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageList: Subject<Message> = new BehaviorSubject<Message>(null);
  /* BehaviorSubject foi inserido devido a erro no getMessage()
  https://stackoverflow.com/questions/41095801/subject-returning-undefined-in-constructor */

  private keepAlive = false;

  constructor(
    private router: Router
  ) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAlive) {
          // only keep for a single route change
          this.keepAlive = false;
        } else {
          // clear alert messages
          this.clearMessage();
        }
      }
    });
  }

  getMessage(): Observable<Message> {
    return this.messageList.asObservable();
  }

  clearMessage() {
    this.messageList.next();
  }

  // alertas
  alert(message: string, type: MessageType, keepAlive = false) {
    this.keepAlive = keepAlive;
    this.messageList.next( { message: message, type: type } );
  }

  success(message: string, keepAlive = false) {
    this.alert(message, MessageType.success, keepAlive);
  }
  error(message: string, keepAlive = false) {
    this.alert(message, MessageType.error, keepAlive);
  }
  warning(message: string, keepAlive = false) {
    this.alert(message, MessageType.warning, keepAlive);
  }
  info(message: string, keepAlive = false) {
    this.alert(message, MessageType.info, keepAlive);
  }

}
