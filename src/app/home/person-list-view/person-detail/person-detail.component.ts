import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private personService: PersonService,
    private router: Router,
  ) {
    const personId: number = Number(this.route.snapshot.params['id']);
    this.person = personService.getPersonById(personId);
  }

  public handleBack(): void {
    this.router.navigate(['/home/list']);
  }
}
