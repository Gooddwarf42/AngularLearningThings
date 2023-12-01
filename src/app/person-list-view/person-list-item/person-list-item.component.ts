import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../person';

@Component({
  selector: 'app-person-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list-item.component.html',
  styleUrl: './person-list-item.component.scss'
})
export class PersonListItemComponent {
  @Input() person! : Person;
}
