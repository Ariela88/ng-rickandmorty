import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Episode } from 'src/app/model/episode';
import { ConnectionService } from 'src/app/service/connection.service';
import { SharedService } from 'src/app/service/shared.service';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Character } from 'src/app/model/character';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit {

  episodeDetails: Episode | null = null;
  episodeData: Episode[] = [];
  characters?: Character[];

  constructor(
    public connection: ConnectionService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {

    const episodeIndex = parseInt(
      this.route.snapshot.paramMap.get('id') || '0',
      10
    );

    if (!isNaN(episodeIndex)) {
      this.connection.getEpisodeById(episodeIndex).subscribe({
        next: (epDetail) => {
          this.episodeDetails = epDetail;

          if (epDetail.characters) {
            const characterID: number[] = epDetail.characters.map(
              (characterUrl: string) => {
                const parts = characterUrl.split('/');
                return parseInt(parts[parts.length - 1], 10);
              }
            )


            const characterObservable: Observable<Character>[] = characterID.map(
              (characterID) => this.connection.getCharWithIndex(characterID)
            );

            forkJoin(characterObservable).subscribe({
              next: (characters) => {
                this.characters = characters;
              },
              error: (error) => console.log(error),
            });
          }
        },
        error: (error) => console.log(error),
      });
    }
  }


}
