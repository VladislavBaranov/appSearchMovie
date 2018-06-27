import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InfoMovie } from '../core/info-movie';
import { SearchMovieService } from '../core/search-movie.service';
import { LibraryService } from '../core/library.service';

@Component({
  selector: 'ams-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {

  private infoMovie: InfoMovie;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private searchMovieService: SearchMovieService,
    private libraryService: LibraryService) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['movieId']) {
        this.getMovie(params['movieId'])
      }
    });
  }

  ngOnInit() {
  }

  getMovie(movieId: string) {
    console.log(movieId);
    this.searchMovieService.getInfoMovie(movieId)
      .do(value => console.log(value))
      .subscribe(value => this.infoMovie = value);
  }

  hasMovie(movie: InfoMovie): boolean {
    if (movie) {
      return this.libraryService.hasMovie(movie);
    }
  }

  addMovie(movie: InfoMovie) {
    if (movie) {
      console.log('movie to adding ');
      return this.libraryService.addMovie(movie);
    }
  }

  removeMovie(movie: InfoMovie) {
    if (movie) {
      return this.libraryService.removeMovie(movie);
    }
  }


}
