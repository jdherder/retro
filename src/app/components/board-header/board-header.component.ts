import { Component, OnInit, Input } from '@angular/core';
import { Schema } from '../../interfaces/schema';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {
  @Input() details: Schema.Details;

  constructor() { }

  ngOnInit() {
  }

}
