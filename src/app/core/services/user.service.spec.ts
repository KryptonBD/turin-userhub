import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { mockUser } from '@app/features/users/components/user/user.component.spec';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', (done) => {
    const users = {
      data: [mockUser],
      page: 1,
      total: 1,
      total_pages: 1,
    };

    service.getUsers().subscribe((response) => {
      expect(response).toEqual(users);
      done();
    });

    const request = httpMock.expectOne(
      `${environment.apiUrl}/users?page=1&per_page=10`
    );
    expect(request.request.method).toBe('GET');
    request.flush(users);
  });

  it('should fetch a single user', (done) => {
    service.getUser(1).subscribe((response) => {
      expect(response).toEqual(mockUser);
      done();
    });

    const request = httpMock.expectOne(`${environment.apiUrl}/users/1`);
    expect(request.request.method).toBe('GET');
    request.flush(mockUser);
  });

  it('should create a user', (done) => {
    const newUser = {
      first_name: 'Test',
      last_name: 'Joe',
      email: 'test@test.com',
    };

    service.createUser(newUser).subscribe((response) => {
      expect(response).toEqual({ ...newUser, id: 1 });
      done();
    });

    const request = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('POST');
    request.flush({ ...newUser, id: 1 });
  });

  it('should update a user', (done) => {
    const updatedUser = {
      ...mockUser,
      first_name: 'Updated',
    };

    service.updateUser(updatedUser).subscribe((response) => {
      expect(response).toEqual(updatedUser);
      expect(response.first_name).toBe('Updated');
      done();
    });

    const request = httpMock.expectOne(
      `${environment.apiUrl}/users/${updatedUser.id}`
    );

    expect(request.request.method).toBe('PUT');
    request.flush(updatedUser);
  });

  it('should delete a user', (done) => {
    service.deleteUser(1).subscribe(() => {
      done();
    });

    const request = httpMock.expectOne(`${environment.apiUrl}/users/1`);
    expect(request.request.method).toBe('DELETE');
    request.flush({});
  });
});
