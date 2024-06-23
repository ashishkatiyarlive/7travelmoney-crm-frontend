import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { findIndex } from 'rxjs';

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

    users!: any;
    cols!: Column[];

    constructor(private userService: UserService, private datePipe: DatePipe) {}

    ngOnInit() {
        this.userService.getUsers().subscribe(data => {
            if (data) {
                data.map((value: any) => {
                    value.createdDate = this.datePipe.transform(value.created_at, 'dd/MM/yyyy, HH:MM');
                    return value;
                })
              this.users = data;
            }
          });

        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'email', header: 'Email'},
            {field: 'phone', header: 'Phone'},
            {field: 'status', header: 'Status'},
            {field: 'createdDate', header: 'Created Date'}
        ];
    }

}
