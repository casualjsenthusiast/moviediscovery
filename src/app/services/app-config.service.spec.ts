import { TestBed } from '@angular/core/testing';
import { AppConfigService } from './app-config.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let httpMock: HttpTestingController;

  const mockConfig = {
    tmdbApiKey: 'mock-api-key',
    tmdbBaseUrl: 'https://mock-api.tmdb.org/3'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppConfigService]
    });

    service = TestBed.inject(AppConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load config and expose api key and base url', (done) => {
    service.loadConfig().subscribe(config => {
      expect(config).toEqual(mockConfig);
      expect(service.tmdbApiKey).toBe('mock-api-key');
      expect(service.tmdbBaseUrl).toBe('https://mock-api.tmdb.org/3');
      done();
    });

    const req = httpMock.expectOne('/assets/config.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockConfig);
  });

  it('should return undefined apiKey and baseUrl before config is loaded', () => {
    expect(service.tmdbApiKey).toBeUndefined();
    expect(service.tmdbBaseUrl).toBeUndefined();
  });
});
