import { Component, OnInit, Input } from '@angular/core';
import { Movie } from "../core/movie";

@Component({
  selector: 'ams-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  @Input()
  private movies: Movie[];

  constructor() { }

  ngOnInit() {
  }

}
