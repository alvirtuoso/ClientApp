import {Observable} from "RxJS/Rx";
import {Injectable} from '@angular/core';
import {Card} from '../../model/card';
import { Repository } from '../../model/repository';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CardService extends Repository{

    cards:Card[] = [];
    apiUrl = 'http://localhost:5000/api/card';
    constructor(private request: Http) {

        super(request);
    }
    create(card: Card): Observable<Card[]>{
        let bodyString = JSON.stringify(card);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options       = new RequestOptions({ headers: headers });
        console.log('card.service Create bodyString: ', bodyString);
        return this.request.post(`${this.apiUrl}/create`, card, options)
                        .do( res => console.log('card.service.create() HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }
    getAll(): Observable<Card[]>{
         return this.request.get(this.apiUrl)
                    .do( res => console.log('card.service.getAll() HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    getCardsByBoardId(boardId:number): Observable<Card[]>{
         return this.request.get(`${this.apiUrl}/${boardId}`)
                    .do( res => console.log('card.service.getAll() HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    update(body: Card): Observable<Card>{
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        let options       = new RequestOptions({ headers: headers });

        return this.request.put(`${this.apiUrl}/${body['id']}`, body, options)
                        .do( res => console.log('UpdateTodo HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }

}