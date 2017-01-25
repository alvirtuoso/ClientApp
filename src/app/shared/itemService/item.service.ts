import {Observable} from "RxJS/Rx";
import {Injectable} from '@angular/core';
import {Item} from '../../model/item';
import { Global } from '../../shared/global';
import { Repository } from '../../model/repository';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ItemService extends Repository{

constructor(private request: Http, private global: Global) {
    super(request);
 }

    items:Item[] = [];
    apiUrl = this.global.apiItemUrl;// 'http://localhost:5000/api/item';
    create(item: Item): Observable<Item>{
        // let bodyString = JSON.stringify(item);
        let headers    = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options    = new RequestOptions({ headers: headers });

        return this.request.post(`${this.apiUrl}/create`, item, options)
                        .do( res => console.log('item.service.create() HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }
    getAll(): Observable<Item[]>{
         return this.request.get(this.apiUrl)
                    .do( res => console.log('item.service.getAll() HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    updateRequest(body: Item): Observable<Item>{
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        let options       = new RequestOptions({ headers: headers });

        return this.request.put(`${this.apiUrl}/${body['id']}`, body, options)
                        .do( res => console.log('UpdateTodo HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }

    createItemForCard(item: Item): Observable<Item[]>{
        let headers    = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options    = new RequestOptions({ headers: headers });

        return this.request.post(`${this.apiUrl}/createforcard`, item, options)
                        .do( res => console.log('item.service.createItemForCard() HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }

}