import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsSocketService: WebsocketService) { }

  sendMessage(msg:string){

    const payload = {
      from: this.wsSocketService.getUser().name,
      body: msg
    };

    this.wsSocketService.emit('mensaje',payload);

  }

  getMessages(){
    return this.wsSocketService.listen('mensaje-nuevo');
  }

  getPrivateMessages(){
    return this.wsSocketService.listen('mensaje-privado');
  }

}
