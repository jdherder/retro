namespace Schema {

  export interface Board {
    readonly $key?: string;
    id: string; // uuid
    routeId: string;
    name: string;
    description: string;
    uid: string;
  }

  export interface Lane {
    readonly $key?: string;
    id: string;
    boardId: string;
    name: string;
    order: number;
  }

  export interface Comment {
    readonly $key?: string;
    id: string;
    laneId: string;
    boardId: string;
    comment: string;
    likes: number;
    date: string; // ISO
  }

}

export { Schema };
