import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

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

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getUsers().subscribe(data => {
            if (data) {
              this.users = data;
            }
          });

        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'email', header: 'Email'},
            {field: 'phone', header: 'Phone'},
            {field: 'status', header: 'Status'},
            {field: 'created_at', header: 'Created Date'}
        ];
    }

}
