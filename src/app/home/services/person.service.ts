import { Injectable } from '@angular/core';
import { Person } from '../person';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private peopleListSubject$: BehaviorSubject<Person[]>;
  public peopleListSubjectObservable$: Observable<Person[]>;

  constructor() {
    this.peopleListSubject$ = new BehaviorSubject(this._personList);
    this.peopleListSubjectObservable$ = this.peopleListSubject$.asObservable();
  }

  public getPeopleCount(list$: Observable<Person[]>): Observable<number> {
    return list$
      .pipe(
        map(personList => personList.length)
      );
  }
  public getFilteredPeople(searchTerms: string): Observable<Person[]> {
    if (searchTerms.length === 0) {
      return this.peopleListSubjectObservable$;
    }

    const searchTermsLower = searchTerms.toLowerCase();
    return this.peopleListSubjectObservable$
      .pipe(
        map(personArray =>
          personArray.filter(p => p.name.toLowerCase().includes(searchTermsLower)
            || p.surname.toLowerCase().includes(searchTermsLower))
        )
      )
  }

  public getPersonById(id: number): Person{
    return this._personList.find(p => p.id === id)!; //hacky!
  }

  addPerson(personToAdd: Person): void {
    this._personList.push(personToAdd);
    this.peopleListSubject$.next(this._personList);
  }

  private _personList: Person[] = [
    {
      id: 0,
      name: "Gianni",
      surname: "Giannoni",
      age: 42,
      phone: "3213236536",
      email: "dragon@rawrmail.grr",
      isMimmo: false
    },
    {
      id: 1,
      name: "Drago",
      surname: "Rosso",
      age: 10,
      phone: "3213236536",
      email: "dragon@rawrmail.grr",
      isMimmo: false
    },
    {
      id: 2,
      name: "Viverna",
      surname: "Verde",
      age: 420,
      phone: "3213236536",
      email: "dragon@rawrmail.grr",
      isMimmo: false
    },
    {
      id: 3,
      name: "Mimmo",
      surname: "Mangusta",
      age: 52,
      phone: "3213236536",
      email: "dragon@rawrmail.grr",
      isMimmo: true
    },
  ]
}
