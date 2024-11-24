import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { filter, map } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  standalone: true,
  selector: 'app-breadcrumb',
  templateUrl: 'breadcrumb.component.html',
  imports: [RouterModule, FontAwesomeModule],
})
export class BreadcrumbComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  protected breadCrumbs = signal<Breadcrumb[]>([]);
  protected icon = faChevronRight;

  constructor() {
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event instanceof NavigationEnd),
        map(() => this.buildBreadCrumbs())
      )
      .subscribe((breadcrumbs) => {
        this.breadCrumbs.set(breadcrumbs);
      });
  }

  private buildBreadCrumbs(
    route = this.activatedRoute,
    url = '',
    breadcrumbs: Breadcrumb[] = [{ label: 'Users', url: '/users' }]
  ): Breadcrumb[] {
    const childRoute = route.firstChild;

    if (!childRoute) {
      return breadcrumbs;
    }

    const routeURL: string = childRoute.snapshot.url
      .map((segment) => segment.path)
      .join('/');

    if (routeURL) {
      const fullURL = `${url}/${routeURL}`;
      const label = this.getRouteLabel(childRoute);

      if (label) {
        breadcrumbs.push({ label, url: fullURL });
      }
    }

    return this.buildBreadCrumbs(childRoute, routeURL, breadcrumbs);
  }

  private getRouteLabel(route: ActivatedRoute): string {
    const label = route.snapshot.data['breadcrumb'];
    if (label) {
      return label;
    }

    return '';
  }
}
