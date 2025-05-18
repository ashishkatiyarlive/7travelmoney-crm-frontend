import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { DropdownModule } from 'primeng/dropdown';

interface Status {
  label: string;
  value: number;
}
@Component({
  selector: 'app-edit-order-dialog',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './edit-order-dialog.component.html',
  styleUrl: './edit-order-dialog.component.css'
})
export class EditOrderDialogComponent implements OnInit {
  formData: any;
  statusList: Status[] | undefined;
  selectedStatus: Status | undefined;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private orderService: OrderService,) {
  }

  ngOnInit(): void {
    this.formData = this.config.data;
    console.log(this.formData);
    this.statusList =  [
      { label: 'In-Progress', value: 1 },
      { label: 'Hold', value: 2 },
      { label: 'Completed', value: 3 }
  ];
  }

  submitForm() {
    const payload = {
      updated_at: new Date(),
      status: parseInt(this.formData.status),
      }
    this.orderService.updateBookedCurrency(this.formData.id, payload)
      .subscribe(success => {
          this.ref.close(this.formData);
      });
    // Close dialog and pass data back to the parent component
   // this.ref.close(this.formData);
  }

  closeDialog() {
    this.ref.close(); // Close dialog without passing any data
  }
}
