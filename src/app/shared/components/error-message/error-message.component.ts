import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-error-message',
  imports: [FontAwesomeModule],
  template: `
    <article
      class="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-md"
    >
      <fa-icon [icon]="icon" aria-label="Error Icon"></fa-icon>
      <p class="m-0" data-testid="app-error-message">{{ message() }}</p>
    </article>
  `,
})
export class ErrorMessageComponent {
  message = input('An error occurred');

  protected icon = faExclamationTriangle;
}
