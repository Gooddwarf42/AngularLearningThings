import { Injectable } from '@angular/core';
import { Person } from '../person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  public GetPeople(): Person[] {
    return this._personList;
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
