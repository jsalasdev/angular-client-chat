import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  
  
  text:string = '';
  subscriptionMessages: Subscription;
  mensajes: any[] = [];
  element: HTMLElement;
  
  constructor(public chatService: ChatService) { }
  
  ngOnInit() {
    this.element = document.getElementById('chat-mensajes');
    this.subscriptionMessages = this.chatService.getMessages().subscribe(msg => {
      
      this.mensajes.push(msg);
      
      setTimeout(()=> {
        this.element.scrollTop = this.element.scrollHeight;
      },50);
      
    });
  }
  
  ngOnDestroy() {
    this.subscriptionMessages.unsubscribe();
  }
  
  send(){
    console.log(this.text);
    if(this.text.trim().length!=0){
      this.chatService.sendMessage(this.text);
      this.text='';
    }
  }
  
}
