import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User, UserResponse } from '../models/user.interface';
import { BaseApiService } from './base-api.service';
import { environment } from 'src/environments/environment';

/**
 * Handles API requests related to users
 */
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseApiService {
  private readonly API_URL = `${environment.apiUrl}/users`;

  /**
   * Fetches paginated users from the API
   * @param page - The page number
   * @param perPage - The number of users per page
   * @returns observable of UserResponse
   */
  getUsers(page = 1, perPage = 10): Observable<UserResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http
      .get<UserResponse>(this.API_URL, { params })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get a single user by id
   * @param id - The user id
   * @returns observable of User
   */
  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Create a new user
   * @param user - The user object
   * @returns observable of User
   */
  createUser(userForm: FormData): Observable<User> {
    return this.http
      .post<User>(this.API_URL, userForm)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing user
   * @param user - The user object
   * @returns observable of User
   * */
  updateUser(userId: number, formData: FormData): Observable<User> {
    return this.http
      .put<User>(`${this.API_URL}/${userId}`, formData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a user by id
   * @param id - The user id
   * @returns observable of unknown
   */
  deleteUser(id: number): Observable<unknown> {
    return this.http
      .delete(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
