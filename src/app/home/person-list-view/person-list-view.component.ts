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
    this.subscription = this.searchBarFormGroup.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(value => value.searchTerms),
        filter((value: string) => value.length > 1 || value.length === 0),
        tap((value: string) => console.log(`Ho scritto ${value}`)),
        map(value => this.personService.getFilteredPeople(value)),
      )
      .subscribe(value => {
        this.filteredPersonList$ = value;
        this.filteredPersonListCount$ = this.personService.getPeopleCount(this.filteredPersonList$)
      });
    this.searchBarFormGroup.enable()// hack to trigger first emission of the above observable

  }
  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private subscription: Subscription | undefined;
  public filteredPersonList$: Observable<Person[]> | undefined;
  public filteredPersonListCount$: Observable<number> | undefined;

  constructor(
    private personService: PersonService,
    private router: Router,
    private formBuilder: FormBuilder,) {
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
