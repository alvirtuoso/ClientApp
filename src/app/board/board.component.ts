import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../model/board';

@Component({
  selector: 'board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {
  @Input() showCreateBoard;
 
  board = new Board("");

  constructor() { }

  ngOnInit() {

  }

  closeBoard(){
    this.showCreateBoard.isOn = !this.showCreateBoard.isOn;
  }
  newBoard(){
    this.board = new Board("");
  }
  onSubmit(form:any):void{
    console.log('FormData:')
    console.log(form);
    
    }

}