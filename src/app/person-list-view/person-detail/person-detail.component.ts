import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../home/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../home/person';

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
    private personService: PersonService,
    private router: Router,
  ) {
    const personId: number = Number(this.route.snapshot.params['id']);
    this.person = personService.GetPersonById(personId);
  }

  public handleBack(): void {
    this.router.navigate(['/home/list']);
  }
}
