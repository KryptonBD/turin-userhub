import { TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '@app/core/services/user.service';
import { mockUser } from '../user/user.component.spec';

describe('UserListComponent', () => {
  let userService: UserService;
  beforeEach(async () => {
    userService = {
      getUsers: jest.fn(),
    } as unknown as UserService;
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should show loading spinner', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('app-loading-spinner');

    expect(element).toBeTruthy();
  });

  xit('should user list', () => {
    TestBed.overrideProvider(UserService, {
      useValue: {
        getUsers: jest.fn().mockReturnValueOnce(Promise.resolve([mockUser])),
      },
    }).compileComponents();

    const fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('app-user');
    expect(element).toBeTruthy();
  });
});
