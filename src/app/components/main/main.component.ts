import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/model/character';
import { ConnectionService } from 'src/app/service/connection.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  characters: Character[] = [];
  currentPage = 1;

  constructor(private storage: StorageService, private connection: ConnectionService, private route:Router) {}

  ngOnInit(): void {
    this.getCharacterData(this.currentPage);
  }

  nextPage() {
    if (this.currentPage < 42) { 
      this.currentPage++;
      this.getCharacterData(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCharacterData(this.currentPage);
    }
  }

  private getCharacterData(page: number) {
    this.connection.getCharacterByPage(page).subscribe(result => {
      this.characters = result;
      
    });
  }

  openDetails(char:Character){

    this.route.navigateByUrl('/details/' + char.id)
    
      }
}
