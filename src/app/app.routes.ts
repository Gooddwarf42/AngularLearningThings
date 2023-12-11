import { Routes } from '@angular/router';
import { PersonListViewComponent } from './home/person-list-view/person-list-view.component';
import { AddPersonComponent } from './home/add-person/add-person.component';
import { PersonDetailComponent } from './home/person-list-view/person-detail/person-detail.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'View list'
  },
  {
    path: 'home/list',
    component: PersonListViewComponent,
    title: 'View list'
  },
  {
    path: 'home/list/add',
    component: AddPersonComponent,
    title: 'Add new person'
  },
  {
    path: 'home/list/details/:id',
    component: PersonDetailComponent,
    title: 'Person detail'
  }
];
