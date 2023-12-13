import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../services/person.service';
import { Person } from '../person';
import { Router } from '@angular/router';
import { HasPendingChanges } from '../../has-pending-changes';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.scss'
})
export class AddPersonComponent implements HasPendingChanges, OnInit {

  private personList: Person[] | undefined;

  constructor(
    private personService: PersonService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

  public HasPendingChanges(): boolean {
    return this.addPersonFormGroupBello.dirty;
  }

  ngOnInit(): void {
    this.personService.GetPeople().subscribe({
      next: value => {
        this.personList = value;
        this.addPersonFormGroupBello.patchValue({ id: value.length })
      }
    });
  }

  public addPersonFormGroupBello: FormGroup = this.formBuilder.group(
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
    this.router.navigate(['/home/list']);
  }
}
