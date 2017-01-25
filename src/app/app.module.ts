import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserService } from './shared/userService/user.service';
import { BoardService } from './shared/boardService/board.service';
import { CardService } from './shared/cardService/card.service';
import { ItemService } from './shared/itemService/item.service';
import { routing } from './app.routing';

import {MaterializeDirective} from 'angular2-materialize';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { NavComponent } from './nav/nav.component';
import { UserComponent } from './user/user.component';
import { BoardFormComponent } from './board-form/board-form.component';
import { CardComponent } from './card/card.component';
import { BoardComponent } from './board/board.component';

import { Global } from './shared/global';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MaterializeDirective,
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
    ItemService,
    Global
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
