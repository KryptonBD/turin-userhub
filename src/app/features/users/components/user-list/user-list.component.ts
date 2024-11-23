import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { UserComponent } from '../user/user.component';
import { UserService } from '@app/core/services/user.service';
import { User } from '@app/core/models/user.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LoadingSpinnerComponent } from '@app/shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '@app/shared/components/error-message/error-message.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/core/services/notification.service';
import { ConfirmDialogComponent } from '@app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: 'user-list.component.html',
  imports: [
    HeaderComponent,
    UserComponent,
    MatPaginatorModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
  ],
})
export class UserListComponent {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationService);
  private destroyRef = inject(DestroyRef);

  protected loading = signal(true);
  protected error = signal<string | null>(null);
  protected users = signal<User[]>([]);
  protected pageSize = signal(5);
  protected currentPage = signal(1);
  protected totalUsers = signal(0);

  private paginator = computed(() => ({
    page: this.currentPage(),
    perPage: this.pageSize(),
  }));

  constructor() {
    effect(() => {
      this.loadUsers();
    });
  }

  // Load Users
  private loadUsers() {
    const { page, perPage } = this.paginator();
    this.userService
      .getUsers(page, perPage)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.users.set(response.data);
          this.totalUsers.set(response.total);
          this.error.set(null);
        },
        error: (error) => {
          this.error.set(error);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }

  protected pageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.currentPage.set(event.pageIndex + 1);
  }

  protected deleteUser(userId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.confirmDeleteUser(userId);
      }
    });
  }

  private confirmDeleteUser(userId: number) {
    this.userService
      .deleteUser(userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          // Update users list
          this.users.set(this.users().filter((user) => user.id !== userId));

          // Show success notification
          this.notificationService.error('User deleted successfully');
        },
        error: (error) => {
          this.notificationService.error('Failed to delete user');
        },
      });
  }
}
