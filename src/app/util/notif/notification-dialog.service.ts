import {Injectable} from '@angular/core';
import {NotificationDialogComponent} from "./notification-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Injectable()
export class NotificationDialogService {

  constructor(private dialog: MatDialog) {
  }

  open(title) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '375px';
    dialogConfig.height = '135px';
    dialogConfig.data = {title: title};
    return this.dialog.open(NotificationDialogComponent, dialogConfig);
  }
}
