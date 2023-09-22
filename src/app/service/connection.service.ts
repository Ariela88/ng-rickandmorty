import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Character } from '../model/character';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

 

  selectedCharacter = ''
  apiUrl = `https://rickandmortyapi.com/api/character`
 

  constructor(private http: HttpClient) { }

  getCharacterByPage(page: number): Observable<Character[]> {
    const url = `${this.apiUrl}/?page=${page}`;
    return this.http.get<any>(url).pipe(
      map(response => response.results)
    );
  }

  getCharacterNext(): Observable<Character[]> {
    

    return this.http.get<any>('https://rickandmortyapi.com/api/character/?page="' + 5 ).pipe(
      map(response => response.results)
     
      

    );

    
  }

  getCharWithIndex(charIndex: number) {
    const url = `${this.apiUrl}/${charIndex}`;
    return this.http.get<Character>(url);
  }

  
}
