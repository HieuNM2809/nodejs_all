import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'pnc-dislog-leave-room',
  templateUrl: './dislog-leave-room.component.html',
  styleUrls: ['./dislog-leave-room.component.scss']
})
export class DislogLeaveRoomComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DislogLeaveRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }
  acceptLeaveRoom(){
    this.dialogRef.close({
      status:200,
      message:"Thành công"
    });
  }

}
