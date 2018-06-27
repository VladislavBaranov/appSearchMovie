import { Injectable } from '@angular/core';
import { InfoMovie } from './info-movie';

@Injectable()
export class LibraryService {

    movies: InfoMovie[] = [];

    constructor() {
        this.load();
    }

    private save() {
        localStorage.setItem('movies', JSON.stringify(this.movies));
    }

    private load() {
        let savedmovies = localStorage.getItem('movies');
        if (!savedmovies) {
            return
        }
        savedmovies = JSON.parse(savedmovies);
        for (let i = 0; i < savedmovies.length; i++) {
            let savedmovie = savedmovies[i];
            this.movies.push(Object.assign(new InfoMovie(), savedmovie));
        }
    }

    addMovie(movie: InfoMovie):void {
        if (!this.hasMovie(movie)) {
            this.movies.push(movie);
            this.save();
        }
    }

    removeMovie(movie: InfoMovie):void {
        let index = this.indexOf(movie);
        this.movies.splice(index, 1);
        this.save();
    }

    hasMovie(movie: InfoMovie): boolean {
        return this.indexOf(movie) !== -1;
    }

    indexOf(movie: InfoMovie): number {
        for (let i = 0; i < this.movies.length; i++) {
            if (this.movies[i].Title === movie.Title) {
                return i
            }
        }
        return -1;
    }

}