import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ams-app-movie',
  templateUrl: './app-movie.component.html',
  styleUrls: ['./app-movie.component.scss']
})
export class AppMovieComponent implements OnInit {

  examples = [
    { link: 'search', label: 'Search' },
    { link: 'library', label: 'Library' }
  ];

  constructor() { }

  ngOnInit() { }
}
