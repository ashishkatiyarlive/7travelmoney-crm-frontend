import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { findIndex } from 'rxjs';
import { Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import {MessageService} from 'primeng/api';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrl: './user-listing.component.css',
  providers: [ConfirmationService, MessageService],
  styles: [`
    :host ::ng-deep button {
        margin-right: .25em;
    }
`]

})
export class UserListingComponent {

    users!: any;
    cols!: Column[];
    msgs: Message[] = [];

    //position: string;

    constructor(private userService: UserService, private datePipe: DatePipe, private router: Router,
      private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private messageService: MessageService
    ) {}

    ngOnInit() {
       this.getUser(); 

        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'email', header: 'Email'},
            {field: 'phone', header: 'Phone'},
            {field: 'status', header: 'Status'},
            {field: 'createdDate', header: 'Created Date'}
        ];

        this.primengConfig.ripple = true;
    }

    getUser(){
      this.userService.getUsers().subscribe(data => {
        if (data) {
            data.map((value: any) => {
                value.createdDate = this.datePipe.transform(value.created_at, 'dd/MM/yyyy, HH:MM');
                return value;
            })
          this.users = data;
        }
      });
    }
    addUser(){
      this.router.navigate(['/add-user']);
    }
    editUser(data: any){
      const userId = data.id;
      this.router.navigate(['/add-user', userId ]);

    }
    deleteUser(data: any){
      const userId = data.id;
      const status = !data.status;
     // console.log(data);
     this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this User?',
      header: 'Are You Sure to Delete this record ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(userId, status).subscribe((res) =>{
          this.messageService.add({severity:'success', summary: 'Success', detail: 'User updated successfully.'});
          this.getUser();
        })
      },
      reject: () => {
      }
  });

    }

  //   confirm() {
  //     // this.confirmationService.confirm({
  //     //     message: 'Are you sure that you want to delete this User?',
  //     //     header: 'Are You Sure to Delete this record ?',
  //     //     icon: 'pi pi-exclamation-triangle',
  //     //     accept: () => {
  //     //         // this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
  //     //     },
  //     //     reject: () => {
  //     //         // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
  //     //     }
  //     // });
  // }

  // delete(){
    
  // }

}
