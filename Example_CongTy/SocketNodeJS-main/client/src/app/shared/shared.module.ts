import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogUserComponent } from './component/dialog-user/dialog-user.component';
import { DialogThemeComponent } from './component/dialog-theme/dialog-theme.component';
import { DialogViewAvatarComponent } from './component/dialog-view-avatar/dialog-view-avatar.component';
import { TranslateModule } from '@ngx-translate/core';
import { DislogLeaveRoomComponent } from './component/dislog-leave-room/dislog-leave-room.component';

const COMPONENT=[
  DialogUserComponent,
  DialogThemeComponent,
  DialogViewAvatarComponent,
  DislogLeaveRoomComponent,

]
const MODULE=[
  MaterialModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  TranslateModule
]

@NgModule({
  declarations: [
    ...COMPONENT,

  ],
  imports: [
    ...MODULE
  ],
  exports:[
    ...COMPONENT,...MODULE
  ],

})
export class SharedModule { }
