import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Schema } from '../interfaces/schema';

@Injectable()
export class DatabaseService {

  private boardsRef: AngularFireList<Schema.Board> = this.db.list('/boards');

  constructor(
    private db: AngularFireDatabase,
  ) {
    const test$ = this.db.list(
      '/boards',
      ref => {
        console.log(ref);
        return ref.orderByChild('id').equalTo('5e6f9ce1-3c37-4f38-bacd-134505ef15ac');
      }
    ).valueChanges();

    test$.subscribe(data => {
      console.log('josh', data);
    });
  }

  getBoard(url: any): Observable<Schema.Board[]> {
    // return this.db.object(boardId).valueChanges();
    return this.db.list(
      '/boards',
      ref => ref.orderByChild('url').equalTo(url)
    ).valueChanges();
  }

  getBoardDetails(boardId: any): Observable<Schema.Details> {
    return this.db.object(`${boardId}/details`).valueChanges();
  }

  newBoard(url: any, name: string, description: string) {
    this.boardsRef.push({
      id: this.uuid(),
      url,
      name,
      description,
    });
  }

  // addComment(value: string, loc: Schema.DbLocation) {
  //   this.db.object(`${loc.boardId}/lanes/${loc.laneKey}/comments/${this.uuid()}`)
  //     .set({
  //       comment: value,
  //       likes: 0,
  //       date: new Date().toISOString(),
  //     });
  // }

  // setCommentLikes(value: number, loc: Schema.DbLocation) {
  //   const hasLiked = this.getLocal(loc.commentKey);

  //   if (hasLiked) {
  //     return;
  //   }

  //   this.db.object(`${loc.boardId}/lanes/${loc.laneKey}/comments/${loc.commentKey}`)
  //     .update({ likes: value });
      
  //   this.saveLocal(loc.commentKey, true);
  // }

  // keyValueObj(data: Object) {
  //   if (!data) {
  //     return [];
  //   }

  //   const keys = Object.keys(data);
    
  //   return keys.map((key) => {
  //     return {
  //       key,
  //       value: data[key],
  //     }
  //   });
  // }

  uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  // buildDefaultBoardData(name: string, description: string) {
  //   return {
  //     details: {
  //       name,
  //       description,
  //     },
  //     lanes: {
  //       [this.uuid()]: {
  //         name: 'What went well',
  //         order: 0,
  //       },
  //       [this.uuid()]: {
  //         name: 'What didn\'t go well',
  //         order: 1,
  //       },
  //       [this.uuid()]: {
  //         name: 'What we could improve',
  //         order: 2,
  //       },
  //     }
  //   };
  // }

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
