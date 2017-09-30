import { Component, OnInit, Input } from '@angular/core';
import { Schema } from '../../interfaces/schema';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment: Schema.CommendCard;

  constructor() { }

  ngOnInit() {
  }

}
