import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Episode } from '../model/episode';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private selectedEpisode = new BehaviorSubject<Episode | null>(null);
  selectedEpisode$ = this.selectedEpisode.asObservable();

  selectEpisode(episode: Episode) {
    this.selectedEpisode.next(episode);
  }
}
