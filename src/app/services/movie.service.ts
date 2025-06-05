import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private config: AppConfigService) { }

  /**
   * Fetches movies based on category.
   * @param category The category string.
   * @param page Page number (default is 1).
   * @returns Observable with API response.
   */
  fetchMoviesByCategory(category: string, page = 1): Observable<any> {
    const url = `${this.config.tmdbBaseUrl}/discover/movie`;
    return this.http.get(url, {
      params: {
        api_key: this.config.tmdbApiKey,
        with_genres: category,
        page
      }
    });
  }

  /**
   * Searches movies by query string.
   * @param query Search string.
   * @returns Observable with API response.
   */
  searchMovies(query: string): Observable<any> {
    const url = `${this.config.tmdbBaseUrl}/search/movie`;
    return this.http.get(url, {
      params: {
        api_key: this.config.tmdbApiKey,
        query
      }
    });
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get(`${this.config.tmdbBaseUrl}/movie/${id}`, {
      params: { api_key: this.config.tmdbApiKey }
    });
  }

  getMovieCredits(id: string): Observable<any> {
    return this.http.get(`${this.config.tmdbBaseUrl}/movie/${id}/credits`, {
      params: { api_key: this.config.tmdbApiKey }
    });
  }

  getSimilarMovies(id: string): Observable<any> {
    return this.http.get(`${this.config.tmdbBaseUrl}/movie/${id}/similar`, {
      params: { api_key: this.config.tmdbApiKey }
    });
  }
}
