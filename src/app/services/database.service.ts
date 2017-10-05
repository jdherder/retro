import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Schema } from '../interfaces/schema';

@Injectable()
export class DatabaseService {

  private boardsRef: AngularFireList<Schema.Board> = this.db.list('/boards');
  private lanesRef: AngularFireList<Schema.Lane> = this.db.list('/lanes');
  private commentsRef: AngularFireList<Schema.Comment> = this.db.list('/comments');

  constructor(
    private db: AngularFireDatabase,
  ) {}

  getBoard(routeId: string): Observable<Schema.Board[]> {
    return this.db.list(
      'boards',
      ref => ref.orderByChild('routeId').equalTo(routeId)
    )
    .snapshotChanges()
    .map(this.mapKeyToData);
  }

  newBoard(routeId: string, name: string, description: string): PromiseLike<any> {
    const boardId = this.uuid();

    /* TODO: Move actions like this to cloud functions ? */

    return this.boardsRef.push({
      id: boardId,
      routeId,
      name,
      description,
    })
    .then(() => {
      return this.lanesRef.push({
        id: this.uuid(),
        boardId,
        name: 'What went well',
        order: 0,
      });
    })
    .then(() => {
      return this.lanesRef.push({
        id: this.uuid(),
        boardId,
        name: 'What didn\'t go well',
        order: 1,
      });
    })
    .then(() => {
      return this.lanesRef.push({
        id: this.uuid(),
        boardId,
        name: 'What we could improve',
        order: 2,
      });
    });
  }

  getLanes(boardId: string): Observable<Schema.Lane[]> {
    return this.db.list(
      'lanes',
      ref => ref.orderByChild('boardId').equalTo(boardId)
    )
    .snapshotChanges()
    .map(this.mapKeyToData);
  }

  getCommentsByLane(laneId: string): Observable<Schema.Comment[]> {
    return this.db.list(
      'comments',
      ref => ref.orderByChild('laneId').equalTo(laneId)
    )
    .snapshotChanges()
    .map(this.mapKeyToData);
  }

  likeComment(comment: Schema.Comment) {
    if (this.getLocal(comment.id)) {
      return;
    }

    // TODO: Can firebase increment an integer field? Make a cloud function?
    return this.db.list('comments')
      .update(comment.$key, { likes: comment.likes + 1 })
      .then(() => {
        this.saveLocal(comment.id, true);
      });
  }

  addComment(comment: string, lane: Schema.Lane): PromiseLike<any> {
    return this.commentsRef.push({
      id: this.uuid(),
      laneId: lane.id,
      boardId: lane.boardId,
      comment: comment,
      likes: 0,
      date: new Date().toISOString(),
    });
  }

  mapKeyToData(actions: any[]) {
    return actions.map(action => {
      return {
        $key: action.key,
        ...action.payload.val(),
      };
    });
  }

  uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  makeSafeName(name) {
    return name.replace(/[^a-z0-9]/g, (s) => {
      let c = s.charCodeAt(0);
      if (c == 32) return '-';
      if (c >= 65 && c <= 90) return s.toLowerCase();
      return '';
    });
  }

  getLocal(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  saveLocal(key: string, data: any) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
}
