import { RouterModule, Routes } from '@angular/router';

import { TodoComponent } from './todo/todo.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'about', component: AboutComponent}
];

export const routing = RouterModule.forRoot(routes);
