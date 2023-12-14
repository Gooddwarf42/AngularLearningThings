import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../services/person.service';
import { Person } from '../person';
import { PersonListItemComponent } from "./person-list-item/person-list-item.component";
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, filter, startWith, switchMap, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-person-list-view',
  standalone: true,
  templateUrl: './person-list-view.component.html',
  styleUrl: './person-list-view.component.scss',
  imports: [CommonModule, PersonListItemComponent, ReactiveFormsModule]
})
export class PersonListViewComponent implements OnInit {

  public ngOnInit(): void {
    this.initObservableMagic();
  }

  public search$: Observable<{ result: Person[], count: number }> = null!

  constructor(
    private personService: PersonService,
    private router: Router,
    private formBuilder: FormBuilder,) {
  }

  public searchBarFormGroup: FormGroup<{ searchTerms: FormControl<string> }> = this.formBuilder.group(
    {
      searchTerms: this.formBuilder.nonNullable.control('')
    }
  )

  private initObservableMagic() {
    this.search$ = this.searchBarFormGroup.controls.searchTerms.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        filter(value => value.length > 1 || value.length === 0),
        tap(value => console.log(`Ho scritto ${value}`)),
        switchMap(value => this.personService.getSearchResults(value))
      );
  }

  HandleAddPersonCLick() {
    this.router.navigate(['/home/list/add'])
  }
}
