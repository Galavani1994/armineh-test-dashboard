import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ActivationDialogComponent} from "@app/utils/notif/activation/activation-dialog.component";

@Injectable({providedIn: 'root'})
export class ActivationDialogService {

  constructor(private dialog: MatDialog) {
  }

  open() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '375px';
    dialogConfig.height = '135px';
    dialogConfig.data = {};
    return this.dialog.open(ActivationDialogComponent, dialogConfig);
  }
}
