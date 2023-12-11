import { Component, OnInit } from '@angular/core';
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
export class AddPersonComponent implements OnInit {

  private personList : Person[] | undefined;

  constructor(
    private personService: PersonService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.personService.GetPeople().subscribe({
      next: value => {
        this.personList = value;
        this.addPersonFormGroupBello.patchValue({id: value.length})
      }
    });
  }

  public addPersonFormGroupBello = this.formBuilder.group(
    {
      id: this.formBuilder.nonNullable.control({ value: 0, disabled: true }),
      name: this.formBuilder.nonNullable.control(''),
      surname: this.formBuilder.nonNullable.control(''),
      age: this.formBuilder.nonNullable.control(0),
      phone: this.formBuilder.control<string>(''),
      email: this.formBuilder.control<string>(''),
      isMimmo: this.formBuilder.nonNullable.control(false),
    }
  )

  public handleSubmit(): void {
    const personToAdd: Person = this.addPersonFormGroupBello.getRawValue();
    this.personService.addPerson(personToAdd);
    this.router.navigate(['/home/list']);
  }

  public HandleBack() {
    let confirmValue = true;
    if (this.addPersonFormGroupBello.dirty) {
      confirmValue = confirm("Dati non salvati, vuoi uscire?");
    }
    if (confirmValue) {
      this.router.navigate(['/home/list']);
    }
  }
}
