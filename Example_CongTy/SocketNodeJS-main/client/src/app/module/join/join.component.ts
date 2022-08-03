import { ResponseRoom, Room } from './../../shared/model/room.model';
import { SocketUserService } from './../../shared/service/socket-user.service';
import { environment } from './../../../environments/environment';
import { SocketService } from './../../shared/service/socket.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pnc-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  joinChatForm: FormGroup;
  lang = localStorage.getItem(environment.NAME_LANGUAGE) || environment.LANGUAGE_DEFAULT;
  // langList: string[] = environment.LANGUAGE_LIST;
  listGroup: Room[]
  constructor(
    public formBuilder: FormBuilder,
    private socketService: SocketService,
    public route: Router,
    private translate: TranslateService,
    private socketUserService: SocketUserService
  ) {
    this.socketService.send('/api/list-room', {})
  }

  ngOnInit(): void {

    this.getAllListRoom()
    this.translate.use(this.lang);
    this.joinChatForm = this.formBuilder.group({
      user_name: ['', [Validators.required]],
      group: ['PDX', [Validators.required]]
    })
  }
  joinChat() {
    if (!this.joinChatForm.valid) {
      return
    }
    let username = this.joinChatForm.value.user_name
    let room = this.joinChatForm.value.group
    this.socketService.send('join', { username, room })
    this.socketService.onMessage("/api/getCurrentUser").subscribe((user: any) => {
      if (user.status === 200) {
        this.socketUserService.storeUser(user.data[0])
        this.route.navigate(['/message'])
      }
    })

  }
  changeLang(key: string) {
    this.lang = key
    this.translate.use(key);
    localStorage.setItem(environment.NAME_LANGUAGE, key);
  }
  getAllListRoom() {
    this.socketService.onMessage("/api/list-room").subscribe((room: ResponseRoom) => {
      if (room.status === 200) {
        this.listGroup = room.data
      }
    })
  }

}
