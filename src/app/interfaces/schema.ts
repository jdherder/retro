namespace Schema {

  export interface KeyValue {
    key: any;
    value: any;
  }

  export interface DbLocation {
    boardId: any;
    laneKey?: any;
    commentKey?: any;
  }

  export interface Details {
    name: string;
    description: string;
  }

  export interface Lane {
    name: string;
    order: number;
    comments: CommendCard[];
  }

  export interface CommendCard {
    comment: string;
    likes: number;
    date: string; // ISO
  }

  export interface Board {
    id: string; // uuid
    url: string;
    name: string;
    description: string;
  }
  
}

export { Schema }