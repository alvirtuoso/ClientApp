import { IModel } from './IModel';

export class Todo implements IModel {

    constructor(public id: number, public userId:number, public title: string, public completed: boolean ) {
                
    }
}