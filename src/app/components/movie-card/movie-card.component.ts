import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  @Input() movie: any;
  watchlisted: boolean = false;

  /**
   * Toggles the movie in localStorage watchlist.
   */
  toggleWatchlist() {
    this.watchlisted = !this.watchlisted;
    const key = `watchlist-${this.movie.id}`;
    if (this.watchlisted) {
      localStorage.setItem(key, JSON.stringify(this.movie));
    } else {
      localStorage.removeItem(key);
    }
  }
}
