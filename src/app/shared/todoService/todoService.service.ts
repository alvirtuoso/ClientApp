import {Observable} from "RxJS/Rx";
import {Injectable} from '@angular/core';
import {Todo} from '../../model/todo';
import { Http, Response } from '@angular/http';

// import 'rxjs/add/operator/map';    see src/app/vendor.ts
// import 'rxjs/add/operator/catch';

@Injectable()
export class TodoService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;
  subtitle: string = "this is todotitle";
  // Placeholder for todo's
  todos: Todo[] = [];

  result: Array<Object>;
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: Http) {

   }

  // Simulate POST /todos
  addTodo(todo: Todo): TodoService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

// Fetch all existing comments
     getTodos() : Observable<Todo[]> {

         // ...using get request
         return this.http.get(this.todoUrl)
                    .do( res => console.log('HTTP response:', res))
                        // ...and calling .json() on the response to return data
                    .map(res => res.json())
                         // ...errors if any
                    .catch(this.handleError);

     }
  private extractData(res: Response) {
    let body = res.json();
    console.log(body.data || {});
    return body.data || { };
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.completed
    });
    return updatedTodo;
  }
  private handleError (error: Response | any) {
    // Enhance: Use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
