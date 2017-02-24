import { Component, OnInit, OnChanges, AfterViewInit, ViewContainerRef, Renderer, ViewChild, ElementRef, Input, EventEmitter } from '@angular/core';
import { Card } from '../model/card';
import { CardService } from '../shared/cardService/card.service';
import { ItemService } from '../shared/itemService/item.service';
import { Item } from '../model/item';
import { Global } from '../shared/global'
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { dragula, DragulaService } from 'ng2-dragula/ng2-dragula';


@Component({
  selector: 'card',
  templateUrl: './card.component.html'
  // styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit {
@Input() boardId:string;
@ViewChild('namebox') namebox: ElementRef;

  constructor(private dragulaService: DragulaService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal, private renderer: Renderer, private cardSvc: CardService, private itemSvc: ItemService, private global: Global)
  {
    overlay.defaultViewContainer = vcRef;

    const bag: any = this.dragulaService.find('bagOne');
    if (bag !== undefined ) this.dragulaService.destroy('bagOne');
    this.dragulaService.setOptions('bagOne', { revertOnSpill: true }); 
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });

  }

  enableTitleEdit: boolean = false;
  cards: Card[] = [];
  card: Card;
  item: Item;
  items: Item[] = [];
  errorMessage: string;
  cardNameOnEdit: string;
  hideme:any = {};
  isDelete: boolean = false;
  deleteNow: boolean = false;
  newCardName = '';

  // Edits a Card's name
  onEnter(value: any) {
    this.card = new Card();
    // this.card.name = <string>value.namebox;
    // this.card.card_id = value.cardid;
    this.card.name = <string>value.namebox;
    this.card.card_Id = <string>value.cardid;
    this.card.active = true;
    this.card.owner_Id = this.global.ownerid; //todo: Replace when login code is done
    this.card.board_Id = this.boardId;

    // Call card edit service
    // this.getCardsByBoardId(this.boardId);

    this.cardSvc.updateRequest(this.card);

}

  ngOnInit() {

  }

  ngOnChanges(){
    if(this.boardId){
     this.getCardsByBoardId(this.boardId);
    }
    console.log('card.component boardID', this.boardId);
  }

  ngAfterViewInit(){
    // set the focus on the input box when component loads
    // this.renderer.invokeElementMethod(this.namebox.nativeElement, 'focus', []);
  }

// Handles drag drop of an item in a card. Only saves the dropping of an item into different card. Saving the item's index order is done in item.component
  onDrop(args) {
    let [el, target, source, sibling] = args;
    let targetCardId = target.title;
    let itemId = el.id;
    console.log('target: ', target.title + ' src: ' + source.title);
    // Update only when dropping into different card
    if(target.title != source.title){
      console.log('notequal');
      this.itemSvc.updateItemCardId(itemId, targetCardId).subscribe();
    }
  }

// Retrieves all cards
 getCards(){
    this.cardSvc.getAll().subscribe(cardlist => {this.cards = cardlist; console.log('cards: ', this.cards)},
                                    err => this.errorMessage = <any>err);

 }

 // FInd cards by Board's Id
  getCardsByBoardId(boardId:string){
    this.cardSvc.getCardsByBoardId(boardId).subscribe(cardList => {this.cards = cardList; console.log('cards: ', this.cards)},
                                      err => this.errorMessage = err);

  }

// Adds new Card by boarder id
  addNew():void{
    // this.card = <Card>{name: form['name'].value, active: true, owner_id: "d705fa4d-23cc-46ca-8a23-e7257a72bca4", board_id: this.boardId};
    let card = new Card();
    card.name = "New Card";
    card.active = true;
    card.owner_Id = this.global.ownerid;
    card.board_Id = this.boardId;

    this.cardSvc.create(card).subscribe(newCard => this.cards.push(newCard), err => this.errorMessage = err);
  }

// Delete card by id
deleteCard(card_id: string, name: string, i: number){
  this.deleteNow = false;

  var deleteByIdUrl = `${this.global.apiCardUrl}/delete/${card_id}`;
      this.modal.confirm()
        .size('lg')
        .title('Confirm Deletion')
        .showClose(true)
        .body(`
           <h2>"${name}"</h2>
        `)
            .okBtn('Delete')
            .cancelBtn('Cancel')
            .open()
            .catch(err => console.log('Deletion Error Occurred: ', err)) // catch error not related to the result (modal open...)
            .then(dialog => dialog.result) // dialog has more properties,lets just return the promise for a result.
            .then(result => {this.cardSvc.delete(deleteByIdUrl); this.cards.splice(i, 1)}) // if were here ok was clicked.
            .catch(err => console.log('Cancelled Deletion', err)); // if were here it was cancelled (click or non block click)

}
// Add new Item to DB
  onSubmit(form:any, card:Card):void{
    event.preventDefault;

    this.item = <Item>{title: form.value["title"], description: "", card_Id: form.value["card_Id"], owner_Id: "d705fa4d-23cc-46ca-8a23-e7257a72bca4", modified_By_Id: "d705fa4d-23cc-46ca-8a23-e7257a72bca4", status_Id: 1};
   // create item. List of items for card is returned .
    this.itemSvc.createItemForCard(this.item)
                                 .map(data => this.items = data)
                                 .subscribe(data => {card.items.push(data[data.length - 1])},   // add the new item to card's items
                                 err => this.errorMessage = <any>err);

    // close the form
    this.toggleNewItem(form.value["sort_order"]);

    if(typeof this.errorMessage !='undefined' && this.errorMessage){
        this.errorMessage = 'Server Error: HttpRequest';
      }else{
        this.errorMessage = '';
      }

  }
  // Returns new Guid. DON'T use this for database ID inserts. not Guarranteed. Merely uses math.random
  newGuid(){
    return Global.newGuid();

  }

  // Opens add new item box
  toggleNewItem(itemId: number){
    this.hideme[itemId] = !this.hideme[itemId];
  }

  // Opens edit card box
  toggleEditTitle(i: string){
    this.hideme[i] = !this.hideme[i];
  }

}