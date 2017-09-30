namespace Schema {

  export interface Lane {
    name: string;
    order: number;
    comments: CommendCard[];
  }

  export interface CommendCard {
    comment: string;
    likes: number;
  }
  
}

export { Schema }