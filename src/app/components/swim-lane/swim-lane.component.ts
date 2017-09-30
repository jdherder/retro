import { Component, OnChanges, Input } from '@angular/core';
import { Schema } from '../../interfaces/schema';

@Component({
  selector: 'app-swim-lane',
  templateUrl: './swim-lane.component.html',
  styleUrls: ['./swim-lane.component.scss']
})
export class SwimLaneComponent implements OnChanges {
  @Input() lane: Schema.Lane;

  comments: Schema.CommendCard[];

  constructor() { }

  ngOnChanges() {
    this.comments = this.lane.comments ? Object.values(this.lane.comments) : [];
  }

}
