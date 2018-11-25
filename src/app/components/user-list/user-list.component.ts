import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  //Another form of manage sockets
  
  activeUsersObs: Observable<any>;
  
  constructor(private ChatService: ChatService) { }
  
  ngOnInit() {
    this.activeUsersObs = this.ChatService.getActiveUsers();
    console.log(this.ChatService.getActiveUsers());
    this.ChatService.emitNewUsers();
  }
  
}
