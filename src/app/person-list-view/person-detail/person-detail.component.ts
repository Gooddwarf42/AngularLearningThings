import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../person.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../../person';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent {

  public person: Person;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) {
    const personId: number = Number(this.route.snapshot.params['id']);
    this.person = personService.GetPersonById(personId);
  }
}
