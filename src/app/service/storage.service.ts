import { Injectable } from '@angular/core';
import { Character } from '../model/character';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  favouritesSubject = new BehaviorSubject<Character[]>([])


 

  constructor() {



    if (localStorage.getItem('favourites')) {
      this.favouritesSubject.next(JSON.parse(localStorage.getItem('favourites')!))

    }
  }

  saveCharacter(Character: Character) {
    Character.isFavourite = true;
    const actualArray = this.favouritesSubject.value
    const newArray = [...actualArray, Character]
    this.favouritesSubject.next(newArray)
    localStorage.setItem('favourites', JSON.stringify(newArray));

  }

  removeCharacter(character: Character) {
    character.isFavourite = false;
    const actualArray = this.favouritesSubject.value
    const newArray = actualArray.filter((p) => p.id !== character.id);
    this.favouritesSubject.next(newArray)
    localStorage.setItem('favourites', JSON.stringify(newArray));
  }

  toggleFavourites(character: Character) {
    if (this.isFavourite(character)) {
      this.removeCharacter(character)

    } else {
      this.saveCharacter(character)
    }
  }


  isFavourite(Character: Character): boolean {


     return this.favouritesSubject.value.some(p => p.id === Character.id)


  }
}
