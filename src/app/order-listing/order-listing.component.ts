import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { DatePipe } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ViewOrderDialogComponent } from '../view-order-dialog/view-order-dialog.component';
import { EditOrderDialogComponent } from '../edit-order-dialog/edit-order-dialog.component';
import { Router } from '@angular/router';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-order-listing',
    templateUrl: './order-listing.component.html',
    styleUrl: './order-listing.component.css',
    providers: [DialogService]
})
export class OrderListingComponent {

    orders!: any;
    cols!: Column[];
    userData: any;

    constructor(private orderService: OrderService, private router: Router, private datePipe: DatePipe,  private dialogService: DialogService) { }

    ngOnInit() {
        let data: any = localStorage.getItem('currentUser');
        this.userData = JSON.parse(data);
        this.getOrders();
        if (this.userData.role === 'Admin') {
            this.cols = [
                { field: 'userName', header: 'User' },
                { field: 'currencyName', header: 'Currency' },
                { field: 'quantityWithSymbol', header: 'Quantity' },
                { field: 'rates', header: 'Buy Rate' },
                { field: 'totalAmount', header: 'Total Amount' },
                { field: 'bookingDate', header: 'Booking Date' },
                { field: 'expiryDate', header: 'Expiry Date' },
                { field: 'statusName', header: 'Status' }
            ];
        } else {
            this.cols = [
                { field: 'currencyName', header: 'Currency' },
                { field: 'quantityWithSymbol', header: 'Quantity' },
                { field: 'rates', header: 'Buy Rate' },
                { field: 'totalAmount', header: 'Total Amount' },
                { field: 'bookingDate', header: 'Booking Date' },
                { field: 'expiryDate', header: 'Expiry Date' },
                { field: 'statusName', header: 'Status' }
            ];
        }
    }

    getOrders() {
        this.orderService.getOrders().subscribe(data => {
            if (data) {
                data.map((value: any) => {
                    value.currencyName = value.currencies?.name;
                    value.userName = value.user?.name;
                    value.rates = `₹${value.rate}`;
                    value.totalAmount = `₹${value.total_amount}`;
                    value.quantityWithSymbol = value.currencies?.symbol + value.quantity;
                    value.bookingDate = this.datePipe.transform(value.booking_date, 'dd/MM/yyyy, HH:MM');
                    value.expiryDate = this.datePipe.transform(value.expiry_date, 'dd/MM/yyyy, HH:MM');
                    if (value.status === 1) {
                        value.statusName = 'In-Progress';
                    } else if (value.status === 2) {
                        value.statusName = 'Hold';
                    } else {
                        value.statusName = 'Completed';
                    }
                    return value;
                })
                this.orders = data;
            }
        });
    }

    viewOrder(data: any) {
         this.dialogService.open(ViewOrderDialogComponent, {
            header: 'Order Details',
            width: '70%',
            data: data
          });
    }

    editOrder(data: any) {
        const ref: DynamicDialogRef = this.dialogService.open(EditOrderDialogComponent, {
            header: 'Order Details',
            width: '70%',
            data: data
          });
          ref.onClose.subscribe((submittedData: any) => {
            if (submittedData) {
              console.log('Data returned from dialog:', submittedData);
              // Handle returned data here
              this.getOrders();
            } else {
              console.log('close dialog');
            }
          });
    }

}
