import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../model/board';
import { BoardService } from '../shared/boardService/board.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {
  @Input() showCreateBoard;

  board = new Board();
  errorMessage: string;
  hasError:boolean = false;
  constructor(private boardSvc: BoardService) { }

  ngOnInit() {

  }

  closeBoard(){
    
      this.showCreateBoard.isOn = !this.showCreateBoard.isOn;
    
    
  }

  onSubmit(form:any):void{
    event.preventDefault();
    // this.boardSvc.getAll().subscribe(error => (this.errorMessage = <any>error));
    
    //  cast to Board object
    this.board = <Board>{title: form.value["title"], classification_id: form.value["classification_id"]};
    this.boardSvc.create(this.board)
      .subscribe(server_error => this.errorMessage = <any>server_error);
      // toggle error message with this flag
      console.log('errorMessage OnSubmit:', this.errorMessage);
      
      if(typeof this.errorMessage !='undefined' && this.errorMessage){
        this.hasError = true;
        this.errorMessage = 'Server Error: HttpRequest';
      }else{
        this.hasError = false;
        this.errorMessage = '';
      }  
      this.closeBoard();
    }

}