import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {

  public boardName: string = '';

  constructor(
    private router: Router,
    private db: DatabaseService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const boardId = this.db.makeSafeName(this.boardName);
    this.db.newBoard(boardId, this.boardName, '');

    // TODO: Only navigate here on newBoard success...
    this.router.navigate([`/board/${boardId}`]);
  }

}
