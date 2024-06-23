import { Component } from '@angular/core';
import { Product } from './../utilities/product'
import { ProductService } from '../services/productservice';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrl: './user-listing.component.css'

})
export class UserListingComponent {

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
            // { field: '', header: 'Status'}
        ];
    }

}
