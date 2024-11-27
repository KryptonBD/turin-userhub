import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UserService } from '@app/core/services/user.service';
import { mockUser } from '../user/user.component.spec';
import { of } from 'rxjs';

describe('UserFormComponent', () => {
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserFormComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title).toBeTruthy();

    expect(title.textContent).toContain('Create User');
  });

  it('should have the avatar picker', () => {
    const avatarPicker = fixture.nativeElement.querySelector(
      '[data-testid="app-user-form-avatar-picker"]'
    );
    expect(avatarPicker).toBeTruthy();
  });

  it('should have the first name, last name and email inputs', () => {
    console.log(fixture.nativeElement.innerHTML);

    const firstNameInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="app-user-form-first-name"]'
    );
    expect(firstNameInput).toBeTruthy();

    const lastNameInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="app-user-form-last-name"]'
    );
    expect(lastNameInput).toBeTruthy();

    const emailInput = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="app-user-form-email"]'
    );
    expect(emailInput).toBeTruthy();
  });

  it('should have the submit button disabled', () => {
    const submitButton = fixture.nativeElement.querySelector(
      '[data-testid="app-user-form-submit"]'
    );
    expect(submitButton).toBeTruthy();
    expect(submitButton.disabled).toBe(true);
  });

  it('should have submit button enabled when form is valid', () => {
    const firstNameInput = fixture.nativeElement.querySelector(
      '[data-testid="app-user-form-first-name"]'
    );
    firstNameInput.value = 'John';
    firstNameInput.dispatchEvent(new Event('input'));

    const lastNameInput = fixture.nativeElement.querySelector(
      '[data-testid="app-user-form-last-name"]'
    );
    lastNameInput.value = 'Doe';
    lastNameInput.dispatchEvent(new Event('input'));

    const emailInput = fixture.nativeElement.querySelector(
      '[data-testid="app-user-form-email"]'
    );
    emailInput.value = 'test@test.com';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      '[data-testid="app-user-form-submit"]'
    );
    expect(submitButton).toBeTruthy();
    expect(submitButton.disabled).toBe(false);
  });
});
