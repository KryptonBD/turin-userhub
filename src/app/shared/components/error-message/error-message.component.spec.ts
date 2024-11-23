import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErrorMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct message', () => {
    let messageElement = fixture.nativeElement.querySelector(
      '[data-testid="app-error-message"]'
    );
    expect(messageElement.textContent).toBe('An error occurred');

    fixture.componentRef.setInput('message', 'Something went wrong');
    fixture.detectChanges();

    messageElement = fixture.nativeElement.querySelector(
      '[data-testid="app-error-message"]'
    );
    expect(messageElement.textContent).toBe('Something went wrong');
  });
});
