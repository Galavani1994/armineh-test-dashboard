import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog-component',
  template: `
    <div dir="rtl" style="text-align: center">
      آیا برای حذف مطمئن هستید؟
    </div>
    <br>
    <div mat-dialog-actions fxLayoutGap="20px" fxLayoutAlign="center center">
      <button class="btn btn-light" style="margin-right: 15px" (click)="close()">
        خیر
      </button>
      <button class="btn btn-danger" color="primary" (click)="onSubmit()">
        بله
      </button>
    </div>`
})
export class DeleteDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DeleteDialogComponent>) {
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
