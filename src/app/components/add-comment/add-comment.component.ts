import { Component, OnInit, Input } from '@angular/core';
import { Schema } from '../../interfaces/schema';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() boardId: any;
  @Input() laneKey: any;

  public addingComment: boolean = false;
  public comment: string = '';

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnInit() {
  }

  openCommentForm() {
    this.addingComment = true;
  }

  onSubmit() {
    console.log('SUBMIT', this.comment);
    this.db.addComment(this.comment, {
      boardId: this.boardId,
      laneKey: this.laneKey,
    });
  }

}
