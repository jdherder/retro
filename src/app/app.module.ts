import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';

// Routing
import { AppRouting } from './app.routing';

// Services
import { DatabaseService } from './services/database.service';

// Pipes

// Components
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { SwimLaneComponent } from './components/swim-lane/swim-lane.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NewBoardComponent } from './components/new-board/new-board.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SwimLaneComponent,
    BoardHeaderComponent,
    CommentCardComponent,
    AddCommentComponent,
    PageNotFoundComponent,
    NewBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    DatabaseService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
