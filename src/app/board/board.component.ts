import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../shared/cardService/card.service';
import { Card } from '../model/card';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'board',
  templateUrl: './board.component.html'
  // styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private cardSvc: CardService, private route: ActivatedRoute) { }
  
  cards: Card[] = [];
  errorBoardMsg:string;
  private observe: any;
  id: number;

  ngOnInit() {
      this.observe = this.route.params
                     .do(params => console.log('boardcomponent ngOnInit params', params))
                     .subscribe(params => this.id = +params['id']);  // (+) converts string 'id' to a number
                    //  .switchMap((params: Params) => this.cardSvc.getCardsByBoardId(+params['id']))
                    //  .subscribe(cards => {this.cards = cards; console.log('cards:', this.cards);});
      
   }

  
   ngOnDestroy() {
    this.observe.unsubscribe();
  }
}