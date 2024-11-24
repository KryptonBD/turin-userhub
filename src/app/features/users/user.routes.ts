import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/user-list/user-list.component').then(
        (m) => m.UserListComponent
      ),
    data: {
      breadcrumb: 'Users',
    },
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/user-form/user-form.component').then(
        (m) => m.UserFormComponent
      ),
    data: {
      breadcrumb: 'Create User',
    },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/user-form/user-form.component').then(
        (m) => m.UserFormComponent
      ),
    data: {
      breadcrumb: 'Edit User',
    },
  },
];
