import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', [
      'getMovieDetails',
      'getMovieCredits',
      'getSimilarMovies'
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, MovieDetailComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '42'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    mockMovieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;

    mockMovieService.getMovieDetails.and.returnValue(of({ id: 42, title: 'Mock Movie', genres: [{ name: 'Drama' }] }));
    mockMovieService.getMovieCredits.and.returnValue(of({ cast: Array.from({ length: 15 }, (_, i) => ({ name: `Actor ${i}` })) }));
    mockMovieService.getSimilarMovies.and.returnValue(of({ results: Array.from({ length: 10 }, (_, i) => ({ title: `Similar ${i}` })) }));

    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchMovieDetails on init', () => {
    expect(mockMovieService.getMovieDetails).toHaveBeenCalledWith('42');
    expect(component.movie).toEqual(jasmine.objectContaining({ id: 42, title: 'Mock Movie' }));
  });

  it('should call fetchCast on init and limit to 10 cast members', () => {
    expect(mockMovieService.getMovieCredits).toHaveBeenCalledWith('42');
    expect(component.cast.length).toBe(10);
  });

  it('should call fetchSimilarMovies on init and limit to 6 results', () => {
    expect(mockMovieService.getSimilarMovies).toHaveBeenCalledWith('42');
    expect(component.similarMovies.length).toBe(6);
  });

  it('should return correct genre list', () => {
    expect(component.genreList).toBe('Drama');
  });

  it('should return empty string for genre list if no genres', () => {
    component.movie = {};
    expect(component.genreList).toBe('');
  });
});
