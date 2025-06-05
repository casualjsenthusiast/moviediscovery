import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movieId!: number;
  movie!: any;
  cast: any[] = [];
  similarMovies: any[] = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id'];
    if (movieId) {
      this.fetchMovieDetails(movieId);
      this.fetchCast(movieId);
      this.fetchSimilarMovies(movieId);
    }
  }

  /**
   * Fetches detailed information about a movie by its ID.
   * @param movieId - The TMDB movie ID.
   */
  fetchMovieDetails(movieId: string): void {
    this.movieService.getMovieDetails(movieId).subscribe(data => {
      this.movie = data;
    });
  }

  /**
   * Fetches cast information for the movie.
   * @param movieId - The TMDB movie ID.
   */
  fetchCast(movieId: string): void {
    this.movieService.getMovieCredits(movieId).subscribe(data => {
      this.cast = data.cast?.slice(0, 10); // Limit to top 10 cast members
    });
  }

  /**
   * Fetches similar movies based on the movie ID.
   * @param movieId - The TMDB movie ID.
   */
  fetchSimilarMovies(movieId: string): void {
    this.movieService.getSimilarMovies(movieId).subscribe(data => {
      this.similarMovies = data.results?.slice(0, 6); // Show top 6 similar movies
    });
  }

  /**
   * Generates a comma-separated list of genres for display.
   * This is a safe getter used in the HTML template.
   * @returns Comma-separated genre names.
   */
  get genreList(): string {
    return this.movie?.genres?.map((g: any) => g.name).join(', ') || '';
  }
}
