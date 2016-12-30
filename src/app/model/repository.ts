import {Observable} from "RxJS/Rx";
import { Response, RequestOptions, Headers, Http } from '@angular/http';

export class Repository {

    constructor(private http: Http) {

    }

    create(obj: Object): any{}
    getAll(): any{}
    update(obj: Object): any{}

    delete(id: number | string, apiUrl: string){
        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });

		return this.http.delete(`${apiUrl}/${id}`,options)
      .do( res => console.log('DeleteTodoById HTTP response:', res))
			.map((res:Response) => res.json())
			.catch(this.handleError);

    }

   handleError (error: any) {
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