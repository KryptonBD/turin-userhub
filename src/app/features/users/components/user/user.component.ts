import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { User } from '@app/core/models/user.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-user',
  templateUrl: './user.component.html',
  imports: [MatCardModule, MatButtonModule, FontAwesomeModule],
})
export class UserComponent {
  user = input.required<User>();
  editUser = output<number>();
  deleteUser = output<number>();

  protected icons = {
    edit: faPen,
    delete: faTrash,
  };

  protected getUserName(): string {
    return `${this.user().first_name} ${this.user().last_name}`;
  }
}
