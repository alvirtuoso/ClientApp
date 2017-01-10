import { Component, OnInit, Input } from '@angular/core';
import { Router }       from '@angular/router';
import { Board } from '../model/board';
import { BoardService } from '../shared/boardService/board.service';

@Component({
  selector: 'board-form',
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent implements OnInit {
  @Input() showCreateBoard;
  // showCreateBoard: { isOn: boolean; } = { isOn: true };

  board = new Board();
  errorMessage: string;
  hasError:boolean = false;
  constructor(private router: Router, private boardSvc: BoardService) { }

  ngOnInit() {

  }

  closeBoard(){
    
      this.showCreateBoard.isOn = !this.showCreateBoard.isOn;
    
    
  }

  onSubmit(form:any):void{
    event.preventDefault();
    // this.boardSvc.getAll().subscribe(error => (this.errorMessage = <any>error));
    
    //  cast to Board object
    this.board = <Board>{title: form.value["title"], owner_id: 1, classification_id: parseInt(form.value["classification_id"])};    
    this.boardSvc.create(this.board)
      .subscribe(server_error => this.errorMessage = <any>server_error,
                board_data => this.board = board_data);
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
      this.router.navigate(['/board', this.board.board_id]);
    }

}