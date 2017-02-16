import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'auth',
  template: `<login></login>
            <signup></signup>
  `
})

export class AuthComponent {

  constructor() {  }

}