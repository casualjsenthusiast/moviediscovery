import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  const mockMovie = {
    id: 123,
    title: 'Test Movie',
    poster_path: '/test.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = mockMovie;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle watchlist from false to true and store movie in localStorage', () => {
    expect(component.watchlisted).toBeFalse();

    component.toggleWatchlist();

    expect(component.watchlisted).toBeTrue();

    const stored = localStorage.getItem(`watchlist-${mockMovie.id}`);
    expect(stored).toBeTruthy();

    const parsed = stored ? JSON.parse(stored) : null;
    expect(parsed?.id).toEqual(mockMovie.id);
  });

  it('should toggle watchlist from true to false and remove movie from localStorage', () => {
    component.watchlisted = true;
    localStorage.setItem(`watchlist-${mockMovie.id}`, JSON.stringify(mockMovie));

    component.toggleWatchlist();

    expect(component.watchlisted).toBeFalse();
    expect(localStorage.getItem(`watchlist-${mockMovie.id}`)).toBeNull();
  });
});
