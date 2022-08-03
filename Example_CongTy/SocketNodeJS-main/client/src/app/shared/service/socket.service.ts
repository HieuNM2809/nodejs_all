import { SocketUserService } from './socket-user.service';
import { Message } from './../model/message';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';


const SERVER_URL = 'http://192.168.1.109:3000';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket?: Socket;
  constructor(private socketUserService: SocketUserService,private http:HttpClient) {

  }

  initSocket(): void {
    this.socket = io(SERVER_URL, {
      auth: {
        "authorization": `Bearer ${CryptoJS.SHA512("q0E1zr6C9reIwb5nAAAF").toString(CryptoJS.enc.Hex)}`
      },
      extraHeaders: {
        'Authorization': `Bearer ${CryptoJS.SHA512("q0E1zr6C9reIwb5nAAAF").toString(CryptoJS.enc.Hex)}`,
      },

    });
    // this.socket = io(SERVER_URL)
  }

  send(event: string, message: any): void {
    this.socket?.emit(event, message);
  }
  sendMessage(event: string, message: {message:string,userid:string}): void {
    this.socket?.emit(event, message);
  }

  onMessage(event:string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket?.on(event, (data: any) => observer.next(data));
    });
  }

  onEvent(event: any): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket?.on(event, () => observer.next());
    });
  }
  getImage(): Observable<any> {
    return this.http.get<any>('https://pixabay.com/api/?key=14358086-c6bc4d025d1cb1d0b963477ec&image_type=photo&pretty=true&lang=vi&per_page=200&category=nature').pipe(
      map((res: any) => {
        if (!res.hits || res.hits.length==0) {
          throw new Error('Value expected!');
        }
        return res.hits;
      }),
      catchError(() => of([]))
    );
  }
}
