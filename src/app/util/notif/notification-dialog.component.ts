import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog-component',
  template: `
    <div dir="rtl" style="text-align: center">
      {{title}}
    </div>
    <br>
    <div mat-dialog-actions fxLayoutGap="20px" fxLayoutAlign="center center">
      <button mat-button (click)="onSubmit()" style="background-color: darkgreen ; color: white">
        بله
      </button>
      <button mat-button (click)="close()" style="background-color: #7b559d ; color: white">
        خیر
      </button>
    </div>`
})
export class NotificationDialogComponent implements OnInit {

  title;

  constructor(private _dialogRef: MatDialogRef<NotificationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = this.data.title;
  }

  ngOnInit() {
  }

  onSubmit() {
    this._dialogRef.close(true);
  }

  close() {
    this._dialogRef.close(false);
  }
}
