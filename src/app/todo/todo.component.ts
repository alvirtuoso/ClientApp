import {Component, OnInit} from '@angular/core';
import {Todo} from '../model/todo';
import {TodoService} from '../shared/todoService/todoService.service';

@Component({
  selector: 'todo-app',
  templateUrl: 'todo.component.html',
  // styleUrls:['todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit{

  newTodo: Todo;
  todos: Todo[];
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

  toggleTodoComplete(todo) {
    this.todoService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }

  getTodos() {
     this.todoService.getTodos()
                         .subscribe(
                       todos => {this.todos = todos},
                       error =>  {this.errorMessage = <any>error});
                       console.log(this.todos);
  }

}