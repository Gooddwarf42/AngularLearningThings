import { Routes } from '@angular/router';
import { PersonListViewComponent } from './person-list-view/person-list-view.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { PersonDetailComponent } from './person-list-view/person-detail/person-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: PersonListViewComponent,
    title: 'View list'
  },
  {
    path: 'add',
    component: AddPersonComponent,
    title: 'Add new person'
  },
  {
    path: 'details/:id',
    component: PersonDetailComponent,
    title: 'Person detail'
  }
];
