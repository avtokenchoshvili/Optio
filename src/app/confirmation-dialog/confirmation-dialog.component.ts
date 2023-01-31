import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(
    private _matDialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) { }
  ok() {
    this._matDialogRef.close(true)
  }

  no() {
    this._matDialogRef.close()
  }
}
