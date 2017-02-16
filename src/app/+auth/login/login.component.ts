import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private af: AngularFire, private router: Router) { }

  ngOnInit() {
  }

// Login with username and password
  onSubmit(formData) {
    if(formData.valid) {
      // console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        console.log('Login Success: ', success);
        this.router.navigate(['', formData.value.email]); // redirect to home
      }).catch(
        (err) => {
        console.log('Login Error: ', err);
        this.router.navigate(['/login']);
      })
    }
  }

  // Login using Google account
  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(
        (success) => {
        console.log('Login Success: ', success);
        this.router.navigate(['']);//(['/profile', this.af.auth.getAuth().auth.email]);
      }).catch(
        (err) => {
        console.log('Login Error: ', err);
        this.router.navigate(['/login']);
      });
}

// Logout user. Applies to both google or email-pwd authentication
  logout() {
    this.af.auth.logout();
  }
}