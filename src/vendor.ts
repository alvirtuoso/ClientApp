// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

// import 'rxjs'; // Loads all rxjs 
 // Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/toPromise';

import '@angularclass/hmr';

import 'materialize-css';
import 'angular2-materialize';

import '../node_modules/materialize-css/bin/materialize.css';

// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
// import '../node_modules/jQuery/src/jquery.js';
import './public/style.js';

import 'dragula/dist/dragula.css';