import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import '../style/app.scss';

@Component({
  selector: 'someday-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
     this.items = af.database.list('/items');
  }
}
