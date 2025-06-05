import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: any;

  constructor(private http: HttpClient) { }

  /**
   * Loads configuration from the assets folder.
   * @returns Observable that completes when config is loaded.
   */
  loadConfig() : Observable<any> {
    return this.http.get('/assets/config.json').pipe(
      tap(config => this.config = config)
    );
  }

  /**
   * Returns the TMDB API key from config.
   */
  get tmdbApiKey(): string {
    return this.config?.tmdbApiKey;
  }

  /**
   * Returns the TMDB base URL from config.
   */
  get tmdbBaseUrl(): string {
    return this.config?.tmdbBaseUrl;
  }
}