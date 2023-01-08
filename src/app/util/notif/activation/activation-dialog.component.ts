import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-activation-dialog-component',
  template: `
    <div dir="rtl" style="text-align: center">
      آیا برای تغییر وضعیت مطمئن هستید؟
    </div>
    <br>
    <div mat-dialog-actions fxLayoutGap="20px" fxLayoutAlign="center center">
      <button mat-button (click)="close()" style="background-color: #C6C6C6 ; color: white">
        خیر
      </button>
      <button mat-button (click)="onSubmit()" style="background-color: #34A1A5 ; color: white">
        بلی
      </button>
    </div>`
})
export class ActivationDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<ActivationDialogComponent>) {
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
