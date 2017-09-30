import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FirebaseService } from './services/firebase.service';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { SwimLaneComponent } from './components/swim-lane/swim-lane.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SwimLaneComponent,
    BoardHeaderComponent,
    CommentCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    FirebaseService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
