import { Component, computed, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { LoadingSpinnerComponent } from '@app/shared/components/loading-spinner/loading-spinner.component';
import { UserService } from '@app/core/services/user.service';
import { NotificationService } from '@app/core/services/notification.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
    HeaderComponent,
    LoadingSpinnerComponent,
    RouterLink,
  ],
})
export class UserFormComponent {
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected userForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  protected loading = signal(false);
  protected avatarPreview = signal<string | null>(null);
  protected isEdit = signal(false);
  private userId = signal<number | null>(null);
  private selectedFile = signal<File | null>(null);

  protected icons = {
    user: faUser,
    delete: faTrash,
  };

  protected title = computed(() =>
    this.isEdit() ? 'Edit User' : 'Create User'
  );

  protected userInitials = computed(() => {
    const firstName = this.userForm.get('first_name')?.value || '';
    const lastName = this.userForm.get('last_name')?.value || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  });

  constructor() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEdit.set(true);
      this.userId.set(+userId);
      this.loadUser();
    }
  }

  private loadUser() {
    this.loading.set(true);
    this.userService.getUser(this.userId()!).subscribe({
      next: (response) => {
        this.userForm.patchValue(response.data);
        this.avatarPreview.set(response.data.avatar || null);
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error('User not found');
        this.router.navigate(['/users']);
      },
    });
  }

  protected handleAvatarChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile.set(file);

      this.avatarPreview.set(URL.createObjectURL(file));
    }
  }

  protected submit(): void {
    if (this.userForm.valid) {
      this.loading.set(true);

      const userData = this.userForm.value;
      const formData = new FormData();

      if (this.selectedFile()) {
        // TODO/FIXME: The server currently cannot handle file uploads
        // formData.append('avatar', this.selectedFile());
      }
      formData.append('avatar', '');

      formData.append('first_name', userData.first_name ?? '');
      formData.append('last_name', userData.last_name ?? '');
      formData.append('email', userData.email ?? '');

      const request = this.isEdit()
        ? this.userService.updateUser(this.userId()!, formData)
        : this.userService.createUser(formData);

      request.subscribe({
        next: () => {
          const message = this.isEdit()
            ? 'User updated successfully'
            : 'User created successfully';
          this.notificationService.success(message);
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.notificationService.error(
            `Failed to ${this.isEdit() ? 'update' : 'create'} user`
          );
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.userForm.controls).forEach((key) => {
        const control = this.userForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  protected deleteAvatar(): void {
    this.avatarPreview.set(null);
    this.selectedFile.set(null);
  }
}
