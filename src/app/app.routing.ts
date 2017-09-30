import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

// Components
import { BoardComponent } from './components/board/board.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Services
// import { AuthGuard } from './services/auth-guard.service';

const parkRoutes: Routes = [
  {
    path: 'board',
    component: BoardComponent,
    // resolve: {
    //   isAuth: AuthGuard,
    // },
  },
  {
    path: 'board/:id',
    component: BoardComponent,
    // resolve: {
    //   isAuth: AuthGuard,
    // },
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      parkRoutes,
      {
        enableTracing: false,
        useHash: false,
      },
    ),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    // AuthGuard,
  ],
})
export class AppRouting {}