
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Movie } from './movie';
import { InfoMovie } from './info-movie';

@Injectable()

export class SearchMovieService {
  private API_PATH: string = 'www.omdbapi.com'; // 'http://www.omdbapi.com/?s=Batman&apikey=de9536a7&page=1';
  private API_KEY: string = 'de9536a7';
  public loading: boolean = false;
  public initialised: boolean = false;
  public totalItems: number = 0;
  public _page: number = 1;
  public pageSize: number = 10;
  public query: string = '';
  public movies: Movie[];
  public infoMovie: InfoMovie;

  constructor(private http: HttpClient) { }

  get startIndex() {
    return this.page * this.pageSize;
  }

  get totalPages() {
    try {
      return Math.ceil(this.totalItems / this.pageSize);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  get page(): number {
    return this._page;
  }

  set page(val: number) {
    if (val !== this.page) {
      this._page = val;
      this.getMovieList(this.query);
    }
  }

  public searchMovies(query: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`http://${this.API_PATH}/?s=${query}&apikey=${this.API_KEY}&page=${this._page}`)
      .catch(this.errorHandler);
  }

  public getInfoMovie(query: string): Observable<InfoMovie> {
    return this.http.get<InfoMovie>(`http://${this.API_PATH}/?i=${query}&plot=full&apikey=${this.API_KEY}`)
      .map(item => this.infoMovieFactory(item))
      .catch(this.errorHandler);
  }

  public getMovieList(queryTitle: string): void {
    this.query = queryTitle;
    this.loading = true;
    this.initialised = true;
    this.movies = [];
    this.searchMovies(queryTitle)
      .do(data => {
        this.totalItems = data['totalResults'];
      })
      .map(data => {
        return data['Search'] ? data['Search'] : [];
      })
      .map(items => {
        return items.map(item => this.moviesFactory(item))
      })
      .do(_s => console.log(_s))
      .do(_ => this.loading = false)
      .subscribe((movies) => this.movies = movies)
  }

  private moviesFactory(item: any): Movie {
    return new Movie(
      item.Poster,
      item.Title,
      item.Type,
      item.year,
      item.imdbID
    );
  }

  private infoMovieFactory(item: any): InfoMovie {
    return new InfoMovie(
      item.Title,
      item.Year,
      item.Rated,
      item.Released,
      item.Runtime,
      item.Genre,
      item.Director,
      item.Writer,
      item.Actors,
      item.Plot,
      item.Language,
      item.Country,
      item.Awards,
      item.Poster,
      item.imdbRating,
      item.imdbID,
      item.Type,
      item.Production,
      item.Website
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    console.error(error.status);
    return Observable.throw(error.message || 'Server Error')
  }

}