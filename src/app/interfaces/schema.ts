namespace Schema {

  export interface Board {
    id: string; // uuid
    routeId: string;
    name: string;
    description: string;
  }

  export interface Details {
    name: string;
    description: string;
  }

  export interface Lane {
    id: string;
    boardId: string;
    name: string;
    order: number;
  }

  export interface Comment {
    id: string;
    laneId: string;
    boardId: string;
    comment: string;
    likes: number;
    date: string; // ISO
  }
  
}

export { Schema }