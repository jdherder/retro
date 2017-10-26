import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {

  public boardName: string;
  public boardDesc: string;

  constructor(
    private router: Router,
    private db: DatabaseService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const safeBoardId = this.db.makeSafeName(this.boardName);

    // FIXME: Check for existance of a board first!
    this.createBoard(safeBoardId);
  }

  createBoard(routeId: any) {
    this.db.newBoard(routeId, this.boardName, this.boardDesc);

    // TODO: Only navigate here on newBoard success...
    this.router.navigate([`/board/${routeId}`]);
  }

}
