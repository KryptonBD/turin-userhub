import { Component } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: 'user-list.component.html',
  imports: [HeaderComponent, UserComponent],
})
export class UserListComponent {
  users = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    first_name: `John ${i}`,
    last_name: `Doe`,
    email: `john${i}@test.com`,
    avatar: 'https://picsum.photos/200',
  }));
}
