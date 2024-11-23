import { BaseApiService } from './base-api.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

describe('BaseApiService', () => {
  let service: BaseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(BaseApiService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should handle client-side ErrorEvent', async () => {
    const errorEvent = new ErrorEvent('Network error', {
      message: 'Failed to connect',
    });
    const error = new HttpErrorResponse({
      error: errorEvent,
    });

    const errorObservable = service['handleError'](error);

    try {
      await firstValueFrom(errorObservable);
      fail('Should have thrown an error');
    } catch (errorMessage) {
      expect(errorMessage).toBe('Error: Failed to connect');
    }
  });

  it('should handle server-side error', async () => {
    const serverError = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      url: 'http://api.testsite.com/data',
      error: { message: 'Resource not found' },
    });

    const errorObservable = service['handleError'](serverError);

    try {
      await firstValueFrom(errorObservable);
      fail('Should have thrown an error');
    } catch (errorMessage) {
      expect(errorMessage).toContain('Error Code: 404');
      expect(errorMessage).toContain(
        'Message: Http failure response for http://api.testsite.com/data'
      );
    }
  });
});
