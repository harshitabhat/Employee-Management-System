import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone:true,
  imports: [    MatDialogModule,
    MatButtonModule,],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  constructor(public dialogRef:MatDialogRef<ConfirmDialogComponent>){}

  onSubmit(){
    this.dialogRef.close(true);
  }

  onCancel(){
    this.dialogRef.close(false);
  }

}
