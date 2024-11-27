import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '@app/core/services/user.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { mockUser } from '../user/user.component.spec';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';

const mockUserResponse = {
  data: [mockUser],
  total: 1,
  page: 1,
  per_page: 10,
  total_pages: 1,
};

describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUsers: jest.fn(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {},
            },
          },
        },
        provideAnimations(),
      ],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(UserListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show loader at initial state', () => {
    fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();
    const loadingElement = fixture.nativeElement.querySelector(
      'app-loading-spinner'
    );
    expect(loadingElement).toBeTruthy();
  });

  it('should load users', fakeAsync(() => {
    const userService = TestBed.inject(UserService);
    jest.spyOn(userService, 'getUsers').mockReturnValue(of(mockUserResponse));
    fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();

    // Effect doesn't get triggered: https://github.com/angular/angular/issues/50466
    flushMicrotasks();
    flush();

    fixture.detectChanges();

    expect(userService.getUsers).toHaveBeenCalled();

    const userElements = fixture.nativeElement.querySelectorAll('app-user');

    expect(userElements).toBeTruthy();
    expect(userElements.length).toBe(1);
  }));

  it('should show no users found message', fakeAsync(() => {
    mockUserResponse.data = [];
    const userService = TestBed.inject(UserService);
    jest.spyOn(userService, 'getUsers').mockReturnValue(of(mockUserResponse));

    fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();
    flushMicrotasks();
    flush();
    fixture.detectChanges();

    const userElements = fixture.nativeElement.querySelector('app-user');
    const noUsersElement = fixture.nativeElement.querySelector(
      '[data-testid="app-user-list-no-user"]'
    );

    expect(userElements).toBeFalsy();
    expect(noUsersElement).toBeTruthy();
  }));

  it('should navigate to edit user page', fakeAsync(() => {
    mockUserResponse.data = [mockUser];
    const userService = TestBed.inject(UserService);
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');
    jest.spyOn(userService, 'getUsers').mockReturnValue(of(mockUserResponse));
    jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));

    fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();
    flushMicrotasks();
    flush();
    fixture.detectChanges();

    const userElement = fixture.nativeElement.querySelector('app-user');
    expect(userElement).toBeTruthy();

    const editButton = userElement.querySelector(
      '[data-testid="app-user-edit-button"]'
    );
    expect(editButton).toBeTruthy();

    editButton.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/users', mockUser.id]);
  }));

  it('should show delete confirmation dialog', fakeAsync(() => {
    mockUserResponse.data = [mockUser];
    const userService = TestBed.inject(UserService);
    const dialog = TestBed.inject(MatDialog);
    const dialogOpenSpy = jest.spyOn(dialog, 'open');
    jest.spyOn(userService, 'getUsers').mockReturnValue(of(mockUserResponse));

    fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();
    flushMicrotasks();
    tick();
    flush();
    fixture.detectChanges();

    const userElement = fixture.nativeElement.querySelector('app-user');
    expect(userElement).toBeTruthy();

    const deleteButton = userElement.querySelector(
      '[data-testid="app-user-delete-button"]'
    );
    expect(deleteButton).toBeTruthy();

    deleteButton.click();
    fixture.detectChanges();

    expect(dialogOpenSpy).toHaveBeenCalled();

    flush();
    tick();
  }));
});
