import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let mockDialogRef = {
    close: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Title',
            message: 'Message',
            confirmText: 'Confirm',
            cancelText: 'Cancel',
          },
        },
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('confirm should close dialog with true', () => {
    const confirmButton = fixture.nativeElement.querySelector(
      '[data-testid="app-confirm-dialog-confirm-button"]'
    );
    expect(confirmButton).toBeTruthy();

    confirmButton.click();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('cancel should close dialog with false', () => {
    const cancelButton = fixture.nativeElement.querySelector(
      '[data-testid="app-confirm-dialog-cancel-button"]'
    );
    expect(cancelButton).toBeTruthy();

    cancelButton.click();
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });
});
