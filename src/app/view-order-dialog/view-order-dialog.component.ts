import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-view-order-dialog',
  standalone: true,
  imports: [],
  templateUrl: './view-order-dialog.component.html',
  styleUrl: './view-order-dialog.component.css'
})
export class ViewOrderDialogComponent {
  formData: any;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.formData = this.config.data;
    console.log(this.formData);
  }

  closeDialog() {
    this.ref.close(); // Close dialog without passing any data
  }
}
