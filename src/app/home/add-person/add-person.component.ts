import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../services/person.service';
import { Person } from '../person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.scss'
})
export class AddPersonComponent {

  constructor(
    private personService: PersonService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

  public addPersonFormGroupBello = this.formBuilder.group(
    {
      id: this.formBuilder.nonNullable.control({ value: this.personService.GetPeople().length, disabled: true }),
      name: this.formBuilder.nonNullable.control(''),
      surname: this.formBuilder.nonNullable.control(''),
      age: this.formBuilder.nonNullable.control(0),
      phone: this.formBuilder.control<string>(''),
      email: this.formBuilder.control<string>(''),
      isMimmo: this.formBuilder.nonNullable.control(false),
    }
  )

  handleSubmit(): void {
    const personToAdd: Person = this.addPersonFormGroupBello.getRawValue();
    this.personService.addPerson(personToAdd);
    this.router.navigate(['/home/list']);
  }
}
