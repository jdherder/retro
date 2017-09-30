import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Schema } from '../../interfaces/schema';

import 'rxjs/add/operator/do';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  id: any;
  lanes: Schema.Lane[];
  private routerSub: any;
  private dbSub: any;
  
  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadData(this.id);
   });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.dbSub.unsubscribe();
  }

  loadData(id: any) {
    this.dbSub = this.db.object(id)
      .subscribe(data => {
        console.log('josh', data);
        this.lanes = Object.values(data.lanes);
      });
  }

}
