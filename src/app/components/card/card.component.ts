import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/model/character';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() characterData?:Character;
  
  @Output() charSelected= new EventEmitter<Character>()


  select(char:number){
    this.charSelected.emit(this.characterData)
    console.log(this.characterData)
  }


}
