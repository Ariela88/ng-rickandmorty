import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/model/character';
import { ConnectionService } from 'src/app/service/connection.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{

  characterDetails?:Character;
  constructor(public connection:ConnectionService, private route:ActivatedRoute){}


  ngOnInit(): void {
    const charIndex = +this.route.snapshot.paramMap.get('index') ?? 0; 
    if (!isNaN(charIndex)) {
      this.connection
        .getCharWithIndex(charIndex)
        .subscribe({
          next: (detail) => this.characterDetails = detail,
          error: (error) => console.log(error),
        });
    }
  }
  
  
  
}
