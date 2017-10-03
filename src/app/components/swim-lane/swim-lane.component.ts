import { Component, OnChanges, Input } from '@angular/core';
import { Schema } from '../../interfaces/schema';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-swim-lane',
  templateUrl: './swim-lane.component.html',
  styleUrls: ['./swim-lane.component.scss']
})
export class SwimLaneComponent implements OnChanges {
  @Input() boardId: any;
  @Input() laneKey: any;
  @Input() laneValue: Schema.Lane;

  commentKeyValuePairs: Schema.KeyValue[] = [];

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnChanges() {
    const commentKeyValuePairs = this.db.keyValueObj(this.laneValue.comments);

    // sort most liked comments to the top (most to least)
    commentKeyValuePairs.sort((a, b) => {
      if (a.value.likes < b.value.likes) {
        return 1;
      }
      
      if (a.value.likes > b.value.likes) {
        return -1;
      }

      return 0;
    });
    
    this.commentKeyValuePairs = commentKeyValuePairs;
  }

}
