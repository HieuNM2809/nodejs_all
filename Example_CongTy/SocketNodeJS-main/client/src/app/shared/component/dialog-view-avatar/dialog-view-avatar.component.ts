import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'pnc-dialog-view-avatar',
  templateUrl: './dialog-view-avatar.component.html',
  styleUrls: ['./dialog-view-avatar.component.scss']
})
export class DialogViewAvatarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogViewAvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit(): void {
    console.log(this.data);

  }

}
