import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Schema } from '../../interfaces/schema';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-swim-lane',
  templateUrl: './swim-lane.component.html',
  styleUrls: ['./swim-lane.component.scss']
})
export class SwimLaneComponent implements OnInit {
  @Input() lane: Schema.Lane;

  comments$: Observable<Schema.Comment[]>;

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnInit() {
    this.comments$ = this.db.getCommentsByLane(this.lane.id)
      .map(comments => comments.sort(this.sortByLikes));
  }

  sortByLikes(a, b) {
    if (a.likes < b.likes) {
      return 1;
    }
    
    if (a.likes > b.likes) {
      return -1;
    }

    return 0;
  }

}
