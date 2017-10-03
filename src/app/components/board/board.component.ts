import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Schema } from '../../interfaces/schema';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  boardId: any;
  laneKeyValuePairs: Schema.KeyValue[];
  private routerSub: any;
  private dbSub: any;
  
  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
  ) {}

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      this.boardId = params['id'];
      this.loadData(this.boardId);
   });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.dbSub.unsubscribe();
  }

  loadData(id: any) {
    this.dbSub = this.db.getBoard(id)
      .subscribe(data => {
        console.log('board data', data);
        this.laneKeyValuePairs = this.db.keyValueObj(data.lanes);
      });
  }

}
