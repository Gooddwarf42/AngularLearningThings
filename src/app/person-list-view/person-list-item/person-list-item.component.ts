import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../person';
import { Router } from '@angular/router';
import { PhonePipe } from "../../phone.pipe";

@Component({
    selector: 'app-person-list-item',
    standalone: true,
    templateUrl: './person-list-item.component.html',
    styleUrl: './person-list-item.component.scss',
    imports: [CommonModule, PhonePipe]
})
export class PersonListItemComponent {
  @Input() person!: Person;


  constructor(
    private router: Router
  ) {
  }

  // Handlers
  public HandleCkick(): void {
    this.router.navigate(['/home/list/details', this.person.id]);
  }
}
