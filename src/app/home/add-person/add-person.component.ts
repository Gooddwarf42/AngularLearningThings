import { Component, OnInit } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonService } from '../services/person.service';
import { Person } from '../person';
import { Router } from '@angular/router';
import { HasPendingChanges } from '../../has-pending-changes';
import { TypedFormGroup } from '../../typedFormGroup';

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
    this.personService.peopleListSubjectObservable$.subscribe({
      next: value => {
        this.personList = value;
        this.addPersonFormGroupBello.patchValue({ id: value.length }) //Of course this won't work as soon as deletion is supported
      }
    });
  }

  public addPersonFormGroupBello: TypedFormGroup<Person> = this.formBuilder.group(
    {
      id: this.formBuilder.nonNullable.control({ value: 0, disabled: true }),
      name: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(1)]),
      surname: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(1)]),
      age: this.formBuilder.nonNullable.control(0),
      phone: this.formBuilder.control<string>(''),
      email: this.formBuilder.control<string>('', [Validators.email]),
      isMimmo: this.formBuilder.nonNullable.control(false),
    }
  )

  public handleSubmit(): void {
    if (!this.addPersonFormGroupBello.valid) {
      alert("Some fields are invalid!");
      return;
    }
    const personToAdd: Person = this.addPersonFormGroupBello.getRawValue();
    this.personService.addPerson(personToAdd);
    this.addPersonFormGroupBello.reset();
    this.router.navigate(['/home/list']);
  }

  public HandleBack() {
    this.router.navigate(['/home/list']);
  }

  public get name(){
    return this.addPersonFormGroupBello.controls.name;
  }
  get surname() {
    return this.addPersonFormGroupBello.controls.surname;
  }
  get email() {
    return this.addPersonFormGroupBello.controls.surname;
  }
}
