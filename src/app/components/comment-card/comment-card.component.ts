import { Component, OnInit, Input } from '@angular/core';
import { Schema } from '../../interfaces/schema';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment: Schema.Comment;

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnInit() {
  }

  like() {
    this.db.likeComment(this.comment);
  }

}
