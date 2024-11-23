import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let client: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([ErrorInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    client = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an error message for status code 0', () => {
    client.get('/api/data').subscribe({
      error: (error) => {
        expect(error).toBe('Unable to connect to the server');
      },
    });

    const request = httpMock.expectOne('/api/data');
    request.error(new ErrorEvent('error'), { status: 0 });
  });

  it('should return an error message for status code 404', () => {
    client.get('/api/data').subscribe({
      error: (error) => {
        expect(error).toBe('Not Found');
      },
    });

    const request = httpMock.expectOne('/api/data');
    request.error(new ErrorEvent('error'), { status: 404 });
  });

  it('should not intercept the response for status code 200', () => {
    client.get('/api/data').subscribe();

    const request = httpMock.expectOne('/api/data');
    request.flush({ data: 'test' });
  });
});
