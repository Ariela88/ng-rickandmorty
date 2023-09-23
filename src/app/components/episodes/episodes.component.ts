import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Episode } from 'src/app/model/episode';
import { ConnectionService } from 'src/app/service/connection.service';
import { SharedService } from 'src/app/service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit {

  episodeDetails: Episode | null = null;
  episodeData: Episode[] = []

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.sharedService.selectedEpisode$.subscribe(
      (episode: Episode | null) => {
        if (episode) {
          this.episodeDetails = episode;
          console.log(episode);
        } else {
          this.episodeDetails = null; 
          console.log("Nessun episodio trovato.");
        }
      },
      (error) => {
        console.log("Errore nel recupero dell'episodio:", error);
      },
      () => {
        console.log("Completato"); 
      }
    );
  }
  
  
  // select(episode: Episode) {
  
  //   this.router.navigateByUrl('/details/' + episode.characters[0].id);
  // }

}
