import { SocketUserService } from './../../service/socket-user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dialog-theme',
  templateUrl: './dialog-theme.component.html',
  styleUrls: ['./dialog-theme.component.scss']
})
export class DialogThemeComponent implements OnInit {
  colorChose:any
  constructor(
    public dialogRef: MatDialogRef<DialogThemeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private socketuserService:SocketUserService
  ) { }

  ngOnInit(): void {
    this.colorChose =this.socketuserService.getStoreTheme()
    console.log(this.colorChose);
  }
  choseColorTheme(color:any){
    this.colorChose = color

  }
  saveColorTheme(){
    this.dialogRef.close({
      color:this.colorChose,
    });

  }
}
