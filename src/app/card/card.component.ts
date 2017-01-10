import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Card } from '../model/card';
import { CardService } from '../shared/cardService/card.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html'
  // styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
@Input() boardId:number;

  constructor(private cardSvc: CardService) { }

  cards: Card[] = [];
  errorMessage: String;
  private observable:any;

  ngOnInit() {
    if(this.boardId){
      this.getCardsByBoardId(this.boardId);
    }
  }
  OnDestroy(){
    this.observable.unsubscribe();
  }

 getCards(){
    this.observable = this.cardSvc.getAll().subscribe(cardlist => this.cards = cardlist,
                                    err => this.errorMessage = <any>err);
 }
  getCardsByBoardId(boardId:number){
    this.observable = this.cardSvc.getCardsByBoardId(boardId).subscribe(cardList => this.cards = cardList,
                                      err => this.errorMessage = err);

  }
  addCardItem(){

  }

}