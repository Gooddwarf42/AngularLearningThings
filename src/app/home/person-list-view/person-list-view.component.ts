import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../services/person.service';
import { Person } from '../person';
import { PersonListItemComponent } from "./person-list-item/person-list-item.component";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-list-view',
  standalone: true,
  templateUrl: './person-list-view.component.html',
  styleUrl: './person-list-view.component.scss',
  imports: [CommonModule, PersonListItemComponent]
})
export class PersonListViewComponent {


  public personList: Observable<Person[]>;
  constructor(
    private personService: PersonService,
    private router: Router) {
    this.personList = personService.GetPeople();
  }

  HandleAddPersonCLick() {
    this.router.navigate(['/home/list/add'])
  }
}
