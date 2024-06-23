import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { DatePipe } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-order-listing',
    templateUrl: './order-listing.component.html',
    styleUrl: './order-listing.component.css'
})
export class OrderListingComponent {

    orders!: any;
    cols!: Column[];

    constructor(private orderService: OrderService, private datePipe: DatePipe) { }

    ngOnInit() {
        this.orderService.getOrders().subscribe(data => {
            if (data) {
                data.map((value: any) => {
                    value.currencyName = value.currencies.name;
                    value.userName = value.user.name;
                    value.rates = `₹${value.rate}`;
                    value.totalAmount = `₹${value.total_amount}`;
                    value.quantityWithSymbol = value.currencies.symbol + value.quantity;
                    value.bookingDate = this.datePipe.transform(value.booking_date, 'dd/MM/yyyy, HH:MM');
                    value.expiryDate = this.datePipe.transform(value.expiry_date, 'dd/MM/yyyy, HH:MM');
                    if(value.status === 1) {
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
    }

}
