import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-loading-spinner',
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="flex justify-center items-center p-8">
      <mat-spinner diameter="40" />
    </div>
  `,
})
export class LoadingSpinnerComponent {}
