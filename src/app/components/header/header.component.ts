import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();

  /**
   * Emits search event to parent component.
   * @param term The search string.
   */
  onSearch(event: Event) {
    this.search.emit((event.target as HTMLInputElement).value);
  }
}