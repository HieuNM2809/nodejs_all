import { TranslateService } from '@ngx-translate/core';
import { DialogViewAvatarComponent } from './shared/component/dialog-view-avatar/dialog-view-avatar.component';
import { DialogThemeComponent } from './shared/component/dialog-theme/dialog-theme.component';
import { Message } from './shared/model/message';
import { Action } from './shared/model/action';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { User } from './shared/model/user';
import { SocketUserService } from './shared/service/socket-user.service';
import { SocketService } from './shared/service/socket.service';
import { Event } from './shared/model/event';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogUserComponent } from './shared/component/dialog-user/dialog-user.component';
import { DialogUserType } from './shared/model/dialog-user-type';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { environment } from 'src/environments/environment';
const AVATAR_URL = 'https://api.adorable.io/avatars/285';
// interface ElementRef {
//   nativeElement: HTMLElement;
// }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private socketService: SocketService,
    private translate: TranslateService,

  ) {
    let lang = localStorage.getItem(environment.NAME_LANGUAGE) || environment.LANGUAGE_DEFAULT;
    this.translate.setDefaultLang(lang);
    translate.use(environment.LANGUAGE_DEFAULT);
  }
  ngOnInit(): void {
    this.socketService.initSocket();
  }
}
