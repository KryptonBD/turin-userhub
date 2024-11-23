import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

// Global error handler for API requests
export const ErrorInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';

      // Custom error handling based on status codes
      if (error.status === 0) {
        errorMessage = 'Unable to connect to the server';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized access';
      } else if (error.status === 404) {
        errorMessage = 'The requested resource was not found';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }

      // Log error for debugging in development
      if (!environment.production) {
        console.error('API Error:', error);
      }

      return throwError(() => errorMessage);
    })
  );
};
