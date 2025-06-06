import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { AppConfigService } from './app-config.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;
  let configServiceStub: Partial<AppConfigService>;

  beforeEach(() => {
    // Provide a stub for AppConfigService
    configServiceStub = {
      tmdbBaseUrl: 'https://api.themoviedb.org/3',
      tmdbApiKey: 'fake-api-key'
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MovieService,
        { provide: AppConfigService, useValue: configServiceStub }
      ]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure no outstanding requests after each test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchMoviesByCategory should call correct URL with params', () => {
    const category = '28';
    const page = 2;

    service.fetchMoviesByCategory(category, page).subscribe();

    const req = httpMock.expectOne(request =>
      request.url === `${configServiceStub.tmdbBaseUrl}/discover/movie` &&
      request.params.get('api_key') === configServiceStub.tmdbApiKey &&
      request.params.get('with_genres') === category &&
      request.params.get('page') === page.toString()
    );

    expect(req.request.method).toBe('GET');
    req.flush({ results: [] });
  });

  it('searchMovies should call correct URL with query param', () => {
    const query = 'batman';

    service.searchMovies(query).subscribe();

    const req = httpMock.expectOne(request =>
      request.url === `${configServiceStub.tmdbBaseUrl}/search/movie` &&
      request.params.get('api_key') === configServiceStub.tmdbApiKey &&
      request.params.get('query') === query
    );

    expect(req.request.method).toBe('GET');
    req.flush({ results: [] });
  });

  it('getMovieDetails should call correct URL with api_key param', () => {
    const id = '123';

    service.getMovieDetails(id).subscribe();

    const req = httpMock.expectOne(request =>
      request.url === `${configServiceStub.tmdbBaseUrl}/movie/${id}` &&
      request.params.get('api_key') === configServiceStub.tmdbApiKey
    );

    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('getMovieCredits should call correct URL with api_key param', () => {
    const id = '456';

    service.getMovieCredits(id).subscribe();

    const req = httpMock.expectOne(request =>
      request.url === `${configServiceStub.tmdbBaseUrl}/movie/${id}/credits` &&
      request.params.get('api_key') === configServiceStub.tmdbApiKey
    );

    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('getSimilarMovies should call correct URL with api_key param', () => {
    const id = '789';

    service.getSimilarMovies(id).subscribe();

    const req = httpMock.expectOne(request =>
      request.url === `${configServiceStub.tmdbBaseUrl}/movie/${id}/similar` &&
      request.params.get('api_key') === configServiceStub.tmdbApiKey
    );

    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
