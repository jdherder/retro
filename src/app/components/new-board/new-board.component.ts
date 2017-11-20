import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {

  public boardName: string;
  public boardDesc: string;
  public errorBoardExists: boolean;
  public user: firebase.User;

  constructor(
    private router: Router,
    private db: DatabaseService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.user
      .take(1)
      .subscribe((user) => {
        this.user = user;
      });
  }

  onSubmit() {
    const safeBoardId = this.db.makeSafeName(this.boardName);
    this.errorBoardExists = false;
    this.createBoard(safeBoardId);
  }

  createBoard(routeId: any) {
    this.db.getBoard(routeId)
    .take(1)
    .subscribe(results => {
      const existingBoard = results[0];

      if (!existingBoard) {
        const uid = this.user ? this.user.uid : null;

        this.db.newBoard(routeId, this.boardName, this.boardDesc, uid)
          .then(() => this.router.navigate([`/board/${routeId}`]));
      } else {
        this.errorBoardExists = true;
      }
    });
  }

}
