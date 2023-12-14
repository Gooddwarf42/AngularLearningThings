import { Injectable } from '@angular/core';
import { Person } from '../person';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  public GetPeople(): Observable<Person[]> {
    return of(this._personList);
  }
  public GetPeopleCount(): Observable<number> {
    return this.GetPeople()
      .pipe(
        map(personList => personList.length)
      );
  }
  public GetFilteredPeople(searchTerms: string): Observable<Person[]> {
    if (searchTerms.length == 0) {
      return this.GetPeople();
    }

    const searchTermsLower = searchTerms.toLowerCase();
    return this.GetPeople()
      .pipe(
        map(personArray =>
          personArray.filter(p => p.name.toLowerCase().includes(searchTermsLower)
            || p.surname.toLowerCase().includes(searchTermsLower))
        )
      )
  }

  public GetPersonById(id: number): Person {
    return this._personList[id];
  }
  addPerson(personToAdd: Person): void {
    this._personList.push(personToAdd);
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
