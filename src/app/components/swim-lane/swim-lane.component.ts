import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Schema } from '../../interfaces/schema';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-swim-lane',
  templateUrl: './swim-lane.component.html',
  styleUrls: ['./swim-lane.component.scss']
})
export class SwimLaneComponent implements OnInit {
  @Input() lane: Schema.Lane;

  public cardsMobileDisplay: boolean = false;
  public comments$: Observable<Schema.Comment[]>;
  public addingComment: boolean = false;
  public comment: string = '';

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

  toggleCardsMobileDisplay(force: boolean) {
    if (force !== undefined) {
      this.cardsMobileDisplay = force;
      return;
    }

    this.cardsMobileDisplay = !this.cardsMobileDisplay;
  }

  addComment() {
    this.addingComment = true;
  }

  cancelComment() {
    this.resetForm();
  }

  submitComment() {
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
