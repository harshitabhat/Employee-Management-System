import { Component,Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-message-snackbar',
  imports: [MatIcon],
  templateUrl: './message-snackbar.component.html',
  styleUrl: './message-snackbar.component.css'
})
export class MessageSnackbarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<MessageSnackbarComponent>
  ) {}

  close() {
    this.snackBarRef.dismiss();
  }

}
