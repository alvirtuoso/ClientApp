import {Observable} from "RxJS/Rx";
import {Injectable} from '@angular/core';
import {User} from '../../model/user';
import { Repository } from '../../model/repository';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService extends Repository{

    apiUrl = 'http://localhost:5000/api/user';
    constructor(private request: Http) {

        super(request);
    }
    create(body: Object): Observable<User[]>{
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options       = new RequestOptions({ headers: headers });

        return this.request.post(this.apiUrl, bodyString, options)
                        .do( res => console.log('user.service.create() HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);


    }
    getAll(): Observable<User[]>{
         return this.request.get(this.apiUrl)
                    .do( res => console.log('user.service.getAll() HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }
    updateRequest(body: Object): Observable<User[]>{
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        let options       = new RequestOptions({ headers: headers });

        return this.request.put(`${this.apiUrl}/${body['id']}`, body, options)
                        .do( res => console.log('UpdateTodo HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }


}