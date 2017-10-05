import { Component, OnInit, Input } from '@angular/core';
import { Schema } from '../../interfaces/schema';

import { DatabaseService } from '../../services/database.service';

/* FIXME: Refactor add-comment to be a modal or something detached from the changing data. Currently when firebase data is updated this comment gets rebuilt because it's living in a dynamic swim lane. */

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() lane: Schema.Lane;

  public addingComment: boolean = false;
  public comment: string = '';

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnInit() {
  }

  toggleCommentForm() {
    this.addingComment = !this.addingComment;
  }

  onSubmit() {
    if (!this.comment) {
      return false;
    }

    this.db.addComment(this.comment, this.lane)
      .then(
        () => {
          this.resetForm();
        },
        (error) => {
          // TODO: Expose to user
          console.error('Could not add comment!');
        }
      );
  }

  resetForm() {
    this.addingComment = false;
    this.comment = '';
  }

}
