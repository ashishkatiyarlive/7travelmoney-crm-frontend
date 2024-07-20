import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { OrderService } from '../services/order.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-booked-currency-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booked-currency-dialog.component.html',
  styleUrl: './booked-currency-dialog.component.css',
  providers: [MessageService]
})
export class BookedCurrencyDialogComponent implements OnInit {
  formData: any;
  OrderError: boolean =  false;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private datePipe: DatePipe,
    private orderService: OrderService, private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formData = this.config.data;
    this.formData['updated_at'] = this.datePipe.transform(this.formData.updated_at, 'dd/MM/yyyy');
    this.formData['quantity'];
    this.formData['total_amount'];
    console.log('Data received in dialog:', this.formData);
  }

  handleChangeQuantity(event: Event) {
    // You can access the input value using event.target.value
    const inputValue: number = parseFloat((event.target as HTMLInputElement).value);
    this.formData.total_amount = (inputValue * this.formData.rate).toFixed(3); 
  }

  submitForm() {
    let currentDate = new Date();
    const payload = {
      rate: parseFloat(this.formData.rate),
      quantity: this.formData.quantity,
      booking_date: new Date(),
      updated_at: new Date(),
      status: 1,
      total_amount: parseFloat(this.formData.total_amount),
      currency_id: this.formData.id,
      expiry_date: this.datePipe.transform(currentDate.setDate(currentDate.getDate() + 1), 'yyyy-MM-dd HH:mm:ss'),
    }
    this.orderService.bookedCurrency(payload)
      .subscribe(success => {
        if (success) {
          // Navigate to home page or perform desired actions on successful login
          this.showSuccess();
          this.ref.close(this.formData);
        } else {
          // Handle login failure
          this.OrderError = true;
        }
      });
    // Close dialog and pass data back to the parent component
    //this.ref.close(this.formData);
  }

  closeDialog() {
    this.ref.close(); // Close dialog without passing any data
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Currency added successfully'});
}

}
