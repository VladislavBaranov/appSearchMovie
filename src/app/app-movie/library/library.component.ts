import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../core/library.service';

@Component({
  selector: 'ams-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor(private libraryService: LibraryService) {  }

  ngOnInit() {
  }

}
