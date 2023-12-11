import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../home/person.service';
import { Person } from '../home/person';
import { PersonListItemComponent } from "./person-list-item/person-list-item.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list-view',
  standalone: true,
  templateUrl: './person-list-view.component.html',
  styleUrl: './person-list-view.component.scss',
  imports: [CommonModule, PersonListItemComponent]
})
export class PersonListViewComponent {


  public personList: Person[] = [];
  constructor(
    private personService: PersonService,
    private router: Router) {
    this.personList = personService.GetPeople();
  }

  HandleAddPersonCLick() {
    this.router.navigate(['/home/list/add'])
  }
}
