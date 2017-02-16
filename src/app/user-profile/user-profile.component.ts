import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../shared/userService/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})

export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
    display_name: string;
  email: string;
  user_id: string;
  private sub: any;
  // userForm: any;
  usr: User;
  constructor(private router: Router, private route: ActivatedRoute, private userSvc: UserService) {
            this.userForm = new FormGroup({
            fname: new FormControl('', CustomValidators.rangeLength([0, 50])),
            lname: new FormControl('', CustomValidators.rangeLength([0, 50])),
            cell: new FormControl('',  CustomValidators.phone('en-US')),
            email: new FormControl('', Validators.compose([Validators.required, CustomValidators.email])),
            displayName: new FormControl('',Validators.required)
        });
  }

  ngOnInit() {
  
    this.sub = this.route.params
        // .do(params => console.log('paaemal', params['user']))
        // .subscribe(params => this.email = params['user']);
      .switchMap((param: Params) => this.userSvc.getUserByEmail('wedneer@yahoo.com'))//param['user']))
      // .finally(() => console.log('finally', this.usr.email)) // not firing
     .subscribe((usr:User) => {this.usr = usr; this.email= this.usr.email;});

  }
  // Save info. Performs validation first.
  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      // Save to database

    }
  }

// Close the form by navigating back to home page
  closeForm(){
     this.router.navigate(['']); // navigate to home
  }
}