import { Injectable } from '@angular/core';

@Injectable()
export class Global {

     public apiBaseUrl:string = "http://localhost:5000/api";
     public apiCardUrl:string = "http://localhost:5000/api/card";
     public apiItemUrl:string = "http://localhost:5000/api/item";
     public apiBoardUrl:string = "http://localhost:5000/api/board";
     public apiUserUrl:string = "http://localhost:5000/api/user";
     public dbDefaultDate: string = "0001-01-01T00:00:00";
    // For Debugging /Testing
    public ownerid: string = "d705fa4d-23cc-46ca-8a23-e7257a72bca4"; // Replace with login info
    // end Debugging /Tesing
    
    public publicClassificationId: string = "faad67d2-7ec6-494e-a4ef-ac126481f77f";
    public teamClassificationId: string = "30c968cb-5686-444d-b138-21d90d15f1ca;"
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}