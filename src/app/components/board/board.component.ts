import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Schema } from '../../interfaces/schema';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  board: Schema.Board;
  routeId: string;
  lanes$: Observable<Schema.Lane[]>;

  private routerSub: Subscription;
  private dataSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
  ) {}

  ngOnInit() {
    this.routerSub = this.route.params
      .subscribe(params => {
        this.routeId = params['id'];
        this.loadData(this.routeId);
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.dataSub.unsubscribe();
  }

  loadData(routeId: string) {
    this.dataSub = this.db.getBoard(routeId)
      .subscribe(results => {
        const board = results[0];
        this.board = board;
        this.lanes$ = this.db.getLanes(board.id);
      });
  }

  trackByFn(index, item) {
    return item.id;
  }

}
