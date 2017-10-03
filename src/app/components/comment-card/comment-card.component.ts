import { Component, OnInit, Input } from '@angular/core';
import { Schema } from '../../interfaces/schema';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() boardId: any;
  @Input() laneKey: any;
  @Input() commentKey: any;
  @Input() commentValue: Schema.CommendCard;

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnInit() {
  }

  like() {
    const newValue = this.commentValue.likes + 1;
    this.db.setCommentLikes(newValue, {
      boardId: this.boardId,
      laneKey: this.laneKey,
      commentKey: this.commentKey
    });
  }

}
