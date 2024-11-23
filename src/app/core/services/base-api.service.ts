import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

/**
 * Base API service to handle common HTTP operations
 */
@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(protected http: HttpClient) {}

  protected handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`; // Client-side error
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; // Server-side error
    }

    return throwError(() => errorMessage);
  }
}
