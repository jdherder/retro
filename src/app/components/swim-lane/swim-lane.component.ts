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
    this.commentKeyValuePairs = this.db.keyValueObj(this.laneValue.comments);
  }

}
