import {Observable} from "RxJS/Rx";
import { Response, RequestOptions, Headers, Http } from '@angular/http';

export class Repository {

    constructor(private http: Http) {

    }

    create(obj: Object): any{}
    getAll(): any{}
    updateRequest(obj: Object): any{}

    delete(apiUrl: string){
      return this.http.delete(apiUrl)
        .do(res => console.log('onDoing Delete:', apiUrl))
        .catch(this.handleError)
        .subscribe(res => console.log(res));
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
    console.error('repository.ts HttpRequest Error', errMsg);
    return Observable.throw(errMsg);
    // return Observable.throw(error.json().error || 'server_error');

  }

}