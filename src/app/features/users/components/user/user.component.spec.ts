import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';

export const mockUser = {
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@testuser.com',
  avatar: 'https://picsum.photos/200',
};

describe('UserComponent', () => {
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    fixture.componentRef.setInput('user', mockUser);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have the correct user name', () => {
    const userName = fixture.nativeElement.querySelector(
      '[data-testid="app-user-name"]'
    );
    expect(userName).toBeTruthy();

    expect(userName.textContent).toContain('John Doe');
  });

  it('should have correct icon on the edit button', () => {
    const editButton = fixture.nativeElement.querySelector(
      '[data-testid="app-user-edit-button"]'
    );
    expect(editButton).toBeTruthy();
    console.log(editButton.innerHTML);

    const editIcon = editButton.querySelector('fa-icon svg');
    expect(editIcon).toBeTruthy();

    expect(editIcon.getAttribute('data-icon')).toBe('pen');
  });

  it('should emit the editUser event', () => {
    const editButton = fixture.nativeElement.querySelector(
      '[data-testid="app-user-edit-button"]'
    );
    expect(editButton).toBeTruthy();

    jest.spyOn(fixture.componentInstance.editUser, 'emit');

    editButton.click();
    expect(fixture.componentInstance.editUser.emit).toHaveBeenCalledWith(
      mockUser.id
    );
  });

  it('should emit the deleteUser event', () => {
    const deleteButton = fixture.nativeElement.querySelector(
      '[data-testid="app-user-delete-button"]'
    );
    expect(deleteButton).toBeTruthy();

    jest.spyOn(fixture.componentInstance.deleteUser, 'emit');

    deleteButton.click();
    expect(fixture.componentInstance.deleteUser.emit).toHaveBeenCalledWith(
      mockUser.id
    );
  });
});
