import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Character } from '../model/character';
import { Episode } from '../model/episode';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  selectedCharacter = '';
  apiUrl = `https://rickandmortyapi.com/api/`;

  constructor(private http: HttpClient) {}

  getCharacterByPage(page: number): Observable<Character[]> {
    const url = `${this.apiUrl + 'character'}/?page=${page}`;
    return this.http.get<any>(url).pipe(map((response) => response.results));
  }



  getCharWithIndex(charIndex: number) {
    return this.http.get<Character>(this.apiUrl+'character/' + charIndex);
  }

  getEpisodeById(episodeId: number) {
    return this.http.get<Episode>(this.apiUrl + 'episode/' + episodeId);
  }
  getEpisodeByLoc(location: string) {
    return this.http.get<Location>(this.apiUrl + 'episode/' + location);
  }
}
