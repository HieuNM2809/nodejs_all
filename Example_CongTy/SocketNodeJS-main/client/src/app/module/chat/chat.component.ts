import { DialogThemeComponent } from './../../shared/component/dialog-theme/dialog-theme.component';
import { DislogLeaveRoomComponent } from './../../shared/component/dislog-leave-room/dislog-leave-room.component';
import { SocketUserService } from './../../shared/service/socket-user.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatList, MatListItem } from '@angular/material/list';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Message } from './../../shared/model/message';
import { Router } from '@angular/router';
import { SocketService } from './../../shared/service/socket.service';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
const Color = require('./../../shared/model/color.json');
@Component({
  selector: 'pnc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  listColorLocal = Color.Color
  messages: Message[] = [];
  roomName: string = ''
  listUserRoom: any[] = []
  messageContent: string = '';
  colorTheme = ''
  storeUser: any
  panelOpenStateRight = false;
  lang = localStorage.getItem(environment.NAME_LANGUAGE) || environment.LANGUAGE_DEFAULT;
  @ViewChild(MatList, { read: ElementRef, static: true }) matList: ElementRef<HTMLElement> = {} as ElementRef;
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems?: QueryList<MatListItem>;
  @ViewChild('autosize') autosize?: CdkTextareaAutosize;
  fileInputLabel: any;
  constructor(
    private socketService: SocketService,
    public route: Router,
    private translate: TranslateService,
    private socketUserService: SocketUserService,
    private dialog: MatDialog
  ) {
    this.storeUser = this.socketUserService.getStoredUser()
    if (this.storeUser) {
      this.socketService.send('join', { username: this.storeUser.name, room: this.storeUser.room })
    }
  }

  async ngOnInit() {
    this.roomName = this.storeUser.room
    this.colorTheme = this.socketUserService.getStoreTheme().toString()
    this.listUserRoom = []
    this.translate.use(this.lang);
    this.initIoConnection()
  }
  initIoConnection(): void {
    this.socketService.onMessage('message')
      .subscribe((messages: any) => {
        this.messages = messages
      });
    this.socketService.onMessage('roomUsers').subscribe((user: any) => {
      if (!user) {
        return
      }
      this.listUserRoom = user
    })
    this.socketService.onMessage("color").subscribe((res: any) => {
      if (res && res.length > 0) {
        console.log(res);

        this.colorTheme = res
        this.socketUserService.storeTheme(this.colorTheme)
      }
    })
    this.socketService.onEvent('connect')
      .subscribe(() => {
        console.log('connected');
      });
    this.socketService.onEvent('disconnect')
      .subscribe((res) => {
        this.socketService.onEvent('connect')
          .subscribe(() => {
            console.log('connected');
          });
      });
  }
  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
    this.matListItems?.changes.subscribe(elements => {
      if (elements) {
        this.scrollToBottom()
        this.autosize?.resizeToFitContent(true);
      }
    });
  }
  private scrollToBottom(): void {
    try {
      document.getElementById("scrollMe")?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });

    } catch (err) {
    }

  }
  sendMessage(message: string): void {
    if (!message && message.length == 0 || message.trim().length === 0) {
      return;
    }
    message = message.trim()
    this.socketService.send('message', {
      message: message,
      user: this.storeUser.name,
      type: 'text'
    });
    this.messageContent = '';
    this.messageContent = this.messageContent.trim()
  }
  leaveRoom() {
    const dialogRef = this.dialog.open(DislogLeaveRoomComponent, {
      data: this.roomName
    });
    dialogRef.afterClosed().subscribe(paramsDialog => {
      if (paramsDialog.status === 200) {
        this.socketService.send('leave', this.roomName)
        this.route.navigateByUrl('/')
        localStorage.clear()
      }
    });
    this.socketService.onMessage("leave").subscribe((res: any) => {
      if (res) {
        this.route.navigateByUrl('/')
        localStorage.clear()
      }
    })
  }

  changeLang(key: string) {
    this.lang = key
    this.translate.use(key);
    localStorage.setItem(environment.NAME_LANGUAGE, key);
  }
  openChoseThemeColor() {
    let dialogRef = this.dialog?.open(DialogThemeComponent, {
      width: '400px',
      data: this.listColorLocal
    });
    dialogRef.afterClosed().subscribe(async paramsDialog => {
      if (!paramsDialog) {
        return;
      }
      this.socketService.send('colorThem', {color:paramsDialog.color,name:this.storeUser.name})
      this.colorTheme = paramsDialog.color
      this.socketUserService.storeTheme(this.colorTheme)
    });
  }
  uploadImages(event: any) {
    // if (event.target) {
    //   // const file = event.target.files[0];
    //   // this.fileInputLabel = file.name;
    //   console.log(event.target.value);
    // }
    if (event?.isTrusted) {
      if (event.target.files && event.target.files[0]) {
        console.log(event.target.files);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);

          this.fileInputLabel = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
    console.log(this.fileInputLabel);

  }
}
