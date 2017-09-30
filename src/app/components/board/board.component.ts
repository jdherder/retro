import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/do';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  id: any;
  private sub: any;
  items: Observable<any[]>;
  
  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('id:', this.id);
      
      this.loadData(this.id);
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadData(id: any) {
    this.items = this.db.object(id).do(data => {
      console.log('josh', data);
    });
  }

}
