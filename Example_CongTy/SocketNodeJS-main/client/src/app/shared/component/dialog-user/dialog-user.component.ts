import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocketUserService } from '../../service/socket-user.service';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss']
})
export class DialogUserComponent implements OnInit {

  usernameFormControl = new FormControl('', [Validators.required]);
  previousUsername: string='';

  constructor(public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any,
    private storedUser: SocketUserService) {
    // this.previousUsername = storedUser.getStoredUser() ? storedUser.getStoredUser() : (params.username ? params.username : undefined);
    this.usernameFormControl.setValue(params.username);
  }

  ngOnInit() {

  }

  public onSave(): void {
    this.dialogRef.close({
      username: this.usernameFormControl.value,
      dialogType: this.params.dialogType,
      previousUsername: this.params.username
    });
    this.usernameFormControl.setValue("")
  }
}
