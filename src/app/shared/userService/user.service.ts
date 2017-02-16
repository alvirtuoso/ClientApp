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
    Add(email: string, displayName: string ): Observable<User>{
        let params = "email=" + email + "&displayName=" + displayName;
        let headers    = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options    = new RequestOptions({ headers: headers });

        return this.request.post(`${this.apiUrl}/add`, params, options)
                        .do( res => console.log('user.service.Add() HTTP response:', res.json()))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);


    }
    getAll(): Observable<User[]>{
         return this.request.get(this.apiUrl)
                    .do( res => console.log('user.service.getAll() HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }
    updateRequest(body: Object): Observable<User>{
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        let options       = new RequestOptions({ headers: headers });

        return this.request.put(`${this.apiUrl}/${body['id']}`, body, options)
                        .do( res => console.log('UpdateTodo HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }

    getUserByEmail(email: string): Observable<User>{
        return this.request.get(`${this.apiUrl}/${email}`)
                    .do( res => console.log('getUserByEmail HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    isExisting (email: string): Observable<Boolean>{
        let params = "email=" + email;
    return this.request.get(`${this.apiUrl}/isExisting/${email}`)
                .do( res => console.log('user IsExisting HTTP response:', res))
                .map((res: Response) => res.json())
                .catch(this.handleError);
    }

}