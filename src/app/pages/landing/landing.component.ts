import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MovieCardComponent
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  private searchSubject = new Subject<string>();
  categories = [
    { label: 'Feel Good', genre: '35' },
    { label: 'Action Fix', genre: '28' },
    { label: 'Mind Benders', genre: '878' }
  ];

  selectedCategory: any = this.categories[0];
  movies: any[] = [];
  noResults = false;
  page = 1;
  totalPages = 1;

  constructor(private movieService: MovieService) {
    this.loadMovies();

    this.searchSubject
      .pipe(
        debounceTime(400), // wait 400ms after last keypress
        distinctUntilChanged()
      )
      .subscribe((term) => this.performSearch(term));
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  /**
   * Loads movies based on selected category.
   */
  loadMovies() {
    if (!this.selectedCategory) return;

    this.movieService.fetchMoviesByCategory(this.selectedCategory.genre, this.page).subscribe(data => {
      this.movies = data.results.filter((movie: any) => movie.poster_path);
      this.totalPages = data.total_pages;
      this.noResults = this.movies.length === 0;
    });
  }

  /**
   * Handles category button click.
   */
  selectCategory(category: any) {
    this.selectedCategory = category;
    this.page = 1;
    this.loadMovies();
  }

  /**
   * Handles search input.
   */
  performSearch(term: string) {
    if (term.trim() === '') {
      this.selectedCategory = this.categories[0];
      this.page = 1;
      this.loadMovies();
      return;
    };

    this.movieService.searchMovies(term).subscribe(data => {
      if (data.results.length) {
        const firstMovie = data.results[0];
        const firstGenreId = firstMovie.genre_ids?.[0];

        if (firstGenreId) {
          const matchedCategory = this.categories.find(cat => +cat.genre === firstGenreId);
          this.selectedCategory = matchedCategory ?? null;
        } else {
          this.selectedCategory = null;
        }

        this.movies = data.results;
        this.totalPages = data.total_pages;
        this.noResults = false;
        this.page = 1;
      } else {
        this.movies = [];
        this.selectedCategory = null;
        this.totalPages = 1;
        this.noResults = true;
      }
    });
  }

  nextPage() {
    this.page++;
    this.loadMovies();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadMovies();
    }
  }
}
