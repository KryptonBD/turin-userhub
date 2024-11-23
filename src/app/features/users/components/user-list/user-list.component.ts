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

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: 'user-list.component.html',
  imports: [HeaderComponent, UserComponent, MatPaginatorModule],
})
export class UserListComponent {
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);

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
      .subscribe((response) => {
        this.users.set(response.data);
        this.totalUsers.set(response.total);
      });
  }

  protected pageChange(event: PageEvent) {
    console.log(event);
    this.pageSize.set(event.pageSize);
    this.currentPage.set(event.pageIndex + 1);
  }
}
