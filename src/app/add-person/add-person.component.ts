import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    private router: Router
  ) {
  }

  public addPersonFormGroup: FormGroup = new FormGroup({
    id: new FormControl(this.personService.GetPeople().length),
    name: new FormControl(''),
    surname: new FormControl(''),
    age: new FormControl(0),
    isMimmo: new FormControl(false),
  });



  handleSubmit() {
    const personToAdd: Person = {
      id: this.addPersonFormGroup.value.id ?? -1,
      name: this.addPersonFormGroup.value.name ?? '',
      surname: this.addPersonFormGroup.value.surname ?? '',
      age: this.addPersonFormGroup.value.age ?? -1,
      isMimmo: this.addPersonFormGroup.value.isMimmo ?? false
    };
    this.personService.AddPerson(personToAdd);
    this.router.navigate(['']);
  }
}
