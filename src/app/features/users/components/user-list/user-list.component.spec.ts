import { TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have  the correct title', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector(
      '[data-testid="app-user-list-title"]'
    );

    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Users');
  });
});
