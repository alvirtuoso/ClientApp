import {Component, OnInit} from '@angular/core';
import {Todo} from '../model/todo';
import {TodoService} from '../shared/todoService/todoService.service';
import {Observable} from "RxJS/Rx";

@Component({
  selector: 'todo-app',
  templateUrl: 'todo.component.html',
  // styleUrls:['todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit{

  newTodo: Todo;
  todos: Todo[];
  todoList: Observable<Todo[]> = null;
  errorMessage: string;

  constructor(private todoService: TodoService) {

  }
    ngOnInit(){
     //called after the constructor and called  after the first ngOnChanges()
     this.getTodos();
  }

  addTodo() {
    this.todoService.addTodo(this.newTodo);

  }

  // toggleTodoComplete(todo) {
  //   this.todoService.toggleTodoComplete(todo);
  // }

  removeTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }

  getTodos() {
     this.todoService.getTodos()
                         .subscribe(
                       todos => {this.todos = todos},
                       error =>  {this.errorMessage = <any>error});

   // this.todoList = this.todoService.getTodos(); // shorter version though without error logging. subscribe & unsubscribe automatically. Use it along with async pipe in the html template

}


}