export class User {

    constructor(public user_id: number
                , public first_name: string
                , public last_name: string
                , public email: string 
                , public address: string
                , public city: string
                , public zip: string
                , public cell: string
                , public phone: string
                , public active: boolean
                , public membership_id: number) {

    }
}