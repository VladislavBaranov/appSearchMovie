import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppMovieComponent } from './app-movie/app-movie.component';
import { LibraryComponent } from './library/library.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'app-movie',
    component: AppMovieComponent,
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'library',
        component: LibraryComponent
      },
      {
        path: 'movie/:movieId',
        component: MovieInfoComponent
      },
      {
        path: '**',
        redirectTo: 'search'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppMovieRoutingModule { }
