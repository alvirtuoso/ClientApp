import {Observable} from "RxJS/Rx";
import {Injectable} from '@angular/core';
import {Board} from '../../model/board';
import { Repository } from '../../model/repository';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BoardService extends Repository{

    apiUrl = 'http://localhost:5000/api/board';
    constructor(private request: Http) {

        super(request);
    }
    create(body: Object): Observable<Board[]>{
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options       = new RequestOptions({ headers: headers });

        return this.request.post(this.apiUrl, bodyString, options)
                        .do( res => console.log('board.service.create() HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);


    }
    getAll(): Observable<Board[]>{
         return this.request.get(this.apiUrl)
                    .do( res => console.log('board.service.getAll() HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }
    update(body: Object): Observable<Board[]>{
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        let options       = new RequestOptions({ headers: headers });

        return this.request.put(`${this.apiUrl}/${body['id']}`, body, options)
                        .do( res => console.log('UpdateTodo HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }

}