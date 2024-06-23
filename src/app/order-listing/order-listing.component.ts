import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';

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

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        this.orderService.getOrders().subscribe(data => {
            if (data) {
                this.orders = data;
            }
        });

        this.cols = [
            { field: 'user_id', header: 'User' },
            { field: 'currency_id', header: 'Currency' },
            { field: 'rate', header: 'Buy Rate' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'total_amount', header: 'Total Amount' },
            { field: 'booking_date', header: 'Booking Date' },
            { field: 'expiry_date', header: 'Expiry Date' },
            { field: 'status', header: 'Status' }
        ];
    }

}
