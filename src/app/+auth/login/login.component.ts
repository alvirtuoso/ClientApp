import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/userService/user.service';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private af: AngularFire, private router: Router, private userSvc: UserService) { }

  ngOnInit() {
  }

// Login with username and password
  loginPassword(formData) {
    if(formData.valid) {
      // console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        console.log('Login Success: ', success);
        this.saveUserToDb(); // Saves to database only if user does not exists and redirects to home
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
        this.saveUserToDb(); // Save to db if user does not exists and redirect to home
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

 // Saves user to the Db if it doesn't exist then redirects to home.
  private saveUserToDb():void{
        this.userSvc.Add(this.af.auth.getAuth().auth.email, this.af.auth.getAuth().auth.displayName)
        .finally(() => this.router.navigate([''])) // redirect to home
        .subscribe((usr)=> {console.log('saveUserToDb in nav.component', usr)});
        this.router.navigate(['']);// Redirect to home
  }
}