export class Board {

    public title: string;
    public board_id?: number;
    public owner_id?: number; // TODO: remove "?" later
    public classification_id: number = 1; // 1 for public, 2 for team

    /**
     *
     */
    constructor() {
      
    }

}