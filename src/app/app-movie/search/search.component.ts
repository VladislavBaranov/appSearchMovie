import { Component, OnInit, NgModule, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { SearchMovieService } from '../core/search-movie.service';
import { Movie } from '../core/movie';
import "rxjs/Rx";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ams-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent implements OnInit, OnDestroy {
  private term: string = '';
  public searchResult: any[] = [];
  searchField: FormControl;
  page = this.searchMovieService.page;
  totalPages = this.searchMovieService.totalPages;
  initialised = this.searchMovieService.initialised;
  movies = this.searchMovieService.movies;
  changePage = this.searchMovieService.page;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchMovieService: SearchMovieService
  ) { }

  ngOnInit() {

    this.route.params
      .subscribe(params => {
        console.log(" parametrs : " + params, this.term);
        if (params['term']) {
          this.term = params['term'];
          this.onSubmit(this.term)
        }
      });
    // autocompliter
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((query) => this.searchMovieService.searchMovies(query))
      .subscribe(result => {
        this.searchResult = result['Search'],
          console.log(result);
      });
  }

  doSearch(query: string) {
    this.term = query;
    if (this.term) {
      this.router.navigate(['../search', { term: this.term }], { relativeTo: this.route })
    } else {
      this.router.navigate(['../search'], { relativeTo: this.route });
    }
  }

  onSubmit(query: string) {
    console.log("Form Submitted! " + query);
    this.searchMovieService.getMovieList(query);
  }
  next(): any {
    console.log('next' + this.searchMovieService.totalItems);
    this.searchMovieService.page = this.searchMovieService.page + 1;
  }

  prev() {
    this.searchMovieService.page = this.searchMovieService.page - 1;
  }

  ngOnDestroy() {
    this.searchMovieService.movies = [];
    this.searchMovieService.initialised = false;
    this.searchMovieService.totalItems = 0;
    console.log("destroy")
  }

}