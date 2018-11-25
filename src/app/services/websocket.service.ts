import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { User } from '../classes/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  public socketStatus = false;
  public user: User;
  
  constructor(private socket: Socket,
              private router: Router) { 
    this.loadStorage();
    this.checkStatus();
  }
  
  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.loadStorage();
    });
    
    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }
  
  emit(event: string, payload?:any, callback?: Function){
    console.log('Emitiendo ',event);
    this.socket.emit(event,payload,callback);
  }
  
  listen(event: string){
    return this.socket.fromEvent(event);
  }
  
  loginWs(name: string){
    return new Promise((resolve, reject) => {
      console.log('Configurando ',name);
      this.emit('configure-user', {name}, (res) => {
        
        this.user = new User(name);
        this.saveStorage();
        resolve();


      });
    });
  }

  logoutWs(){
    this.user = null;
    localStorage.removeItem('user');
    const payload = {
      name:''
    }
    this.emit('configure-user', payload, () => {});
    //I dont like this --> testing router modes
    this.router.navigateByUrl('');
  }

  getUser(){
    return this.user;
  }

  saveStorage(){
    localStorage.setItem('user',JSON.stringify(this.user));
  }
  
  loadStorage(){

    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loginWs(this.user.name);
    }

  }

}
