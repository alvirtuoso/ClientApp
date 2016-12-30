import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav.component.html'
  // styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  showNewBoard: { isOn: boolean; } = { isOn: false };

  constructor() { }

  ngOnInit() {

  }

  toggleNewBoard(){
    this.showNewBoard.isOn = !this.showNewBoard.isOn;
  }
  // newBoard(){
  //   this.board = new Board("");
  // }
  // onSubmit(form:any):void{
  //   console.log('FormData:')
  //   console.log(form);
  //   }
}