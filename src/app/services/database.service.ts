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
  ) {
    // this.commentsRef.push({
    //   id: this.uuid(),
    //   laneId: 'b1f12d8e-a9db-11e7-abc4-cec278b6b50a',
    //   boardId: '0008ec42-e3d8-4367-8635-d56c876d3902',
    //   comment: 'Hey there! Hello World!',
    //   likes: 4,
    //   date: new Date().toISOString(),
    // });
    // this.commentsRef.push({
    //   id: this.uuid(),
    //   laneId: 'b1f12d8e-a9db-11e7-abc4-cec278b6b50a',
    //   boardId: '0008ec42-e3d8-4367-8635-d56c876d3902',
    //   comment: 'Hey there! Hello World!',
    //   likes: 4,
    //   date: new Date().toISOString(),
    // });
    // this.commentsRef.push({
    //   id: this.uuid(),
    //   laneId: 'b1f12d8e-a9db-11e7-abc4-cec278b6b50a',
    //   boardId: '0008ec42-e3d8-4367-8635-d56c876d3902',
    //   comment: 'Hey there! Hello World!',
    //   likes: 4,
    //   date: new Date().toISOString(),
    // });
  }

  getBoard(routeId: string): Observable<Schema.Board[]> {
    return this.db.list(
      'boards',
      ref => ref.orderByChild('routeId').equalTo(routeId)
    ).valueChanges();
  }

  newBoard(routeId: string, name: string, description: string) {
    const boardId = this.uuid();

    this.boardsRef.push({
      id: boardId,
      routeId,
      name,
      description,
    });

    /* TODO: Move actions like this to cloud functions ? */

    this.lanesRef.push({
      id: this.uuid(),
      boardId,
      name: 'What went well',
      order: 0,
    });

    this.lanesRef.push({
      id: this.uuid(),
      boardId,
      name: 'What didn\'t go well',
      order: 1,
    });

    this.lanesRef.push({
      id: this.uuid(),
      boardId,
      name: 'What we could improve',
      order: 2,
    });
  }

  getLanes(boardId: string): Observable<Schema.Lane[]> {
    return this.db.list(
      'lanes',
      ref => ref.orderByChild('boardId').equalTo(boardId)
    ).valueChanges();
  }

  getComments(laneId: string): Observable<Schema.Comment[]> {
    return this.db.list(
      'comments',
      ref => ref.orderByChild('laneId').equalTo(laneId)
    ).valueChanges();
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
