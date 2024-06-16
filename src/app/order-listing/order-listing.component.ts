import { Component } from '@angular/core';
import { Product } from './../utilities/product'
import { ProductService } from '../services/productservice';

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

  products!: Product[];

    cols!: Column[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];
    }

}
