import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../person.service';
import { Person } from '../person';
import { PersonListItemComponent } from "./person-list-item/person-list-item.component";

@Component({
    selector: 'app-person-list-view',
    standalone: true,
    templateUrl: './person-list-view.component.html',
    styleUrl: './person-list-view.component.scss',
    imports: [CommonModule, PersonListItemComponent]
})
export class PersonListViewComponent {

  public personList : Person[] = [];
  constructor(private personService: PersonService) {
    this.personList = personService.GetPeople();
  }
}
