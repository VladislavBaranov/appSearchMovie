import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppMovieRoutingModule } from './app-movie-routing.module';
import { AppMovieComponent } from './app-movie/app-movie.component';
import { LibraryComponent } from './library/library.component';
import { LibraryService } from './core/library.service';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { SearchComponent } from './search/search.component';
import { SearchMovieService } from './core/search-movie.service';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    AppMovieRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    AppMovieComponent,
    LibraryComponent,
    MovieInfoComponent,
    MovieListComponent,
    SearchComponent
  ],
  providers: [
    LibraryService,
    SearchMovieService
  ]
})

export class AppMovieModule {
  constructor() { }
}
