import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TodoService } from './shared/todoService/todoService.service';
import { UserService } from './shared/userService/user.service';
import { BoardService } from './shared/boardService/board.service';
import { CardService } from './shared/cardService/card.service';
import { routing } from './app.routing';

import {MaterializeDirective} from 'angular2-materialize';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { TodoComponent } from './todo/todo.component';
import { NavComponent } from './nav/nav.component';
import { UserComponent } from './user/user.component';
import { BoardFormComponent } from './board-form/board-form.component';
import { CardComponent } from './card/card.component';
import { BoardComponent } from './board/board.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MaterializeDirective,
    TodoComponent,
    NavComponent,
    UserComponent,
    BoardFormComponent,
    CardComponent,
    BoardComponent
],
  providers: [
    UserService,
    BoardService,
    CardService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
