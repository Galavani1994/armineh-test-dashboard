import {Injectable} from '@angular/core';
import {DeleteDialogComponent} from "./delete-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Injectable({providedIn: 'root'})
export class DeleteDialogService {

  constructor(private dialog: MatDialog) {
  }

  open() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '375px';
    dialogConfig.height = '135px';
    dialogConfig.data = {};
    return this.dialog.open(DeleteDialogComponent, dialogConfig);
  }
}
