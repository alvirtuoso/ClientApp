import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire } from 'angularfire2';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent {

  constructor(private af: AngularFire, private router: Router) {  }

  onSubmit(formData) {
    if(formData.valid) {
      // console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        console.log('User Registration Success: ', success);
        this.router.navigate(['/login'])
      }).catch(
        (err) => {
        console.log('User Reg Error: ', err);
        this.router.navigate(['/login']);
      })
    }
  }
}