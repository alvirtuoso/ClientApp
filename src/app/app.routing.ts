import { RouterModule, Routes } from '@angular/router';

import { TodoComponent } from './todo/todo.component';
import { BoardFormComponent } from './board-form/board-form.component';
import { BoardComponent } from './board/board.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'board-form', component: BoardFormComponent },
  { path: 'about', component: AboutComponent},
  { path: 'board/:id', component: BoardComponent }
];

export const routing = RouterModule.forRoot(routes);
