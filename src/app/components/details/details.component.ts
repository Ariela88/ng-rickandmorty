import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/model/character';
import { Episode } from 'src/app/model/episode';
import { ConnectionService } from 'src/app/service/connection.service';
import { forkJoin, Observable } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  characterDetails?: Character;
  episodes?: Episode[];
  @Input() episodeData?: Episode;
  @Input() locationData?: Location;

  constructor(
    public connection: ConnectionService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const charIndex = parseInt(
      this.route.snapshot.paramMap.get('id') || '0',
      10
    );

    if (!isNaN(charIndex)) {
      this.connection.getCharWithIndex(charIndex).subscribe({
        next: (charDetail) => {
          this.characterDetails = charDetail;

          if (charDetail.episode) {
            const episodeIds: number[] = charDetail.episode.map(
              (episodeUrl) => {
                const parts = episodeUrl.split('/');
                return parseInt(parts[parts.length - 1], 10);
              }
            );
            const episodeObservables: Observable<Episode>[] = episodeIds.map(
              (episodeId) => this.connection.getEpisodeById(episodeId)
            );

            forkJoin(episodeObservables).subscribe({
              next: (episodes) => {
                this.episodes = episodes;
                console.log(episodes);
              },
              error: (error) => console.log(error),
            });
          }

          console.log(charDetail);
        },
        error: (error) => console.log(error),
      });
    }
  }

  select(episode: Episode) {
    this.sharedService.selectEpisode(episode);
  }
}
