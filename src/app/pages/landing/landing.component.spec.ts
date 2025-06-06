import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockMovies = {
    results: [
      { id: 1, title: 'Test Movie', poster_path: 'poster1.jpg', genre_ids: [35] }
    ],
    total_pages: 2
  };

  beforeEach(async () => {
    const movieSpy = jasmine.createSpyObj('MovieService', ['fetchMoviesByCategory', 'searchMovies']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LandingComponent],
      providers: [
        { provide: MovieService, useValue: movieSpy },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    movieServiceSpy.fetchMoviesByCategory.and.returnValue(of(mockMovies));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', () => {
    expect(movieServiceSpy.fetchMoviesByCategory).toHaveBeenCalled();
    expect(component.movies.length).toEqual(0);
  });

  it('should change category and reload movies', () => {
    const newCategory = { label: 'Action Fix', genre: '28' };
    component.selectCategory(newCategory);
    expect(component.selectedCategory).toEqual(newCategory);
    expect(component.page).toBe(1);
    expect(movieServiceSpy.fetchMoviesByCategory).toHaveBeenCalledWith('28', 1);
  });

  it('should navigate to next page and load movies', () => {
    component.page = 1;
    component.nextPage();
    expect(component.page).toBe(2);
    expect(movieServiceSpy.fetchMoviesByCategory).toHaveBeenCalledWith(component.selectedCategory.genre, 2);
  });

  it('should navigate to previous page and load movies', () => {
    component.page = 2;
    component.prevPage();
    expect(component.page).toBe(1);
    expect(movieServiceSpy.fetchMoviesByCategory).toHaveBeenCalledWith(component.selectedCategory.genre, 1);
  });

  it('should not go to previous page if already on first page', () => {
    component.page = 1;
    component.prevPage();
    expect(component.page).toBe(1);
  });

  it('should perform search and set selected category if matching genre is found', fakeAsync(() => {
    const searchResults = {
      results: [
        { id: 1, title: 'Sci-Fi Movie', genre_ids: [35] }
      ],
      total_pages: 1
    };
    movieServiceSpy.searchMovies.and.returnValue(of(searchResults));

    component.onSearch('sci-fi');
    tick(400);
    expect(component.selectedCategory.genre).toBe('35');
    expect(component.movies.length).toBe(1);
  }));

  it('should not perform search on empty result', () => {
    component.performSearch('');
    expect(component.page).toEqual(1);
    expect(component.selectedCategory).toEqual(component.categories[0]);
  });

  it('should clear category and set noResults true if search returns nothing', fakeAsync(() => {
    movieServiceSpy.searchMovies.and.returnValue(of({ results: [], total_pages: 0 }));

    component.onSearch('unknown');
    tick(400);
    expect(component.selectedCategory).toBeNull();
    expect(component.movies.length).toBe(0);
    expect(component.noResults).toBeTrue();
  }));

  it('should navigate to movie details', () => {
    component.goToDetails(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movie', 1]);
  });
});
