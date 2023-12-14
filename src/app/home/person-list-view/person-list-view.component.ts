import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../services/person.service';
import { Person } from '../person';
import { PersonListItemComponent } from "./person-list-item/person-list-item.component";
import { Router } from '@angular/router';
import { Observable, Subscription, debounce, debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-person-list-view',
  standalone: true,
  templateUrl: './person-list-view.component.html',
  styleUrl: './person-list-view.component.scss',
  imports: [CommonModule, PersonListItemComponent, ReactiveFormsModule]
})
export class PersonListViewComponent implements OnInit, OnDestroy {

  public ngOnInit(): void {
    const myObservable$ =
      this.searchBarFormGroup.valueChanges.pipe(
        debounceTime(200),
        map(value => value.searchTerms),
        filter((value: string) => value.length > 2 || value.length === 0),
        tap((value: string) => console.log(`Ho scritto ${value}`)),
        distinctUntilChanged(),
        map(value => this.personService.GetFilteredPeople(value)),
      );

    this.subscription = myObservable$.subscribe(value => this.filteredPersonList$ = value);
  }
  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private subscription: Subscription | undefined;
  public personList$: Observable<Person[]>;
  public filteredPersonList$: Observable<Person[]> | undefined;

  constructor(
    private personService: PersonService,
    private router: Router,
    private formBuilder: FormBuilder,) {
    this.personList$ = personService.GetPeople();
  }

  public searchBarFormGroup: FormGroup = this.formBuilder.group(
    {
      searchTerms: this.formBuilder.nonNullable.control('')
    }
  )

  HandleAddPersonCLick() {
    this.router.navigate(['/home/list/add'])
  }
}
