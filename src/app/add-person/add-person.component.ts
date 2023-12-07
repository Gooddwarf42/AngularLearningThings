import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../person.service';
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

  public addPersonFormGroup = new FormGroup({
    id: new FormControl({ value: this.personService.GetPeople().length, disabled: true }),
    name: new FormControl<string>(''),
    surname: new FormControl(''),
    age: new FormControl(0),
    isMimmo: new FormControl(false),
  });

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

  hendleSubmitBello(): void {
    const personToAdd: Person = this.addPersonFormGroupBello.getRawValue();
    this.personService.addPerson(personToAdd);
    this.router.navigate(['']);
  }


  handleSubmit() {
    const personToAdd: Person = {
      id: this.addPersonFormGroup.getRawValue().id ?? -1,
      name: this.addPersonFormGroup.value.name ?? '',
      surname: this.addPersonFormGroup.value.surname ?? '',
      age: this.addPersonFormGroup.value.age ?? -1,
      email: "TODO",
      phone: "TODO",
      isMimmo: this.addPersonFormGroup.value.isMimmo ?? false
    };
    // this.formGroup.GetRawValue();
    this.personService.addPerson(personToAdd);
    this.router.navigate(['']);
  }
}
