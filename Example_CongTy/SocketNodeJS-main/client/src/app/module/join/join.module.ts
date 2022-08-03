import { SharedModule } from './../../shared/shared.module';
import { JoinRoutingModule } from './join-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinComponent } from './join.component';



@NgModule({
  declarations: [
    JoinComponent
  ],
  imports: [
    CommonModule,
    JoinRoutingModule,
    SharedModule
  ]
})
export class JoinModule { }
