# Turin Userhub

An Angular application for managing users with features like listing, creating, editing, and deleting users. Built with Angular 18, Angular Material, and Tailwind CSS.

## Features

- User list with pagination
- Create and edit users
- Delete users with confirmation
- Responsive material design
- Mock authentication (Bearer token)
- Toast notifications
- Breadcrumb navigation

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v20.11.1 or higher)
- Git

## Installation

1. Clone the repository

```bash
git clone
cd turin-userhub
```

2. Install dependencies

```bash
npm install
```

## Development Server

Run the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project Structure

```
src/
├── app/
│   ├── core/                 # Core functionality
│   │   ├── interceptors/     # HTTP interceptors
│   │   ├── models/          # Interfaces
│   │   └── services/        # API services
│   ├── features/            # Feature modules
│   │   └── users/          # User management feature
│   │       ├── components/  # User-related components
│   │       └── routes.ts    # User routing
│   ├── shared/             # Shared components
│   └── app.component.ts    # Root component
└── styles/                # Global styles
```

## Key Technologies

- Angular 18
- Angular Material
- Tailwind CSS
- RxJS
- TypeScript

## API Integration

The application uses a mock API with the following endpoints:

- GET /users - List users
- GET /users/:id - Get single user
- POST /users - Create user
- PUT /users/:id - Update user
- DELETE /users/:id - Delete user

All API requests include a mock Bearer token for authentication demonstration.

To view the API documentation, visit [Reqres api docs](https://reqres.in/api-docs/).

## Available Scripts

- `ng serve` - Start development server
- `ng build` - Build the project
- `ng test` - Run unit tests
- `ng lint` - Lint the code
- `ng e2e` - Run end-to-end tests

## Building for Production

To build the project for production:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Environment Configuration

The application includes two environment configurations, I have used reqres.in as the API base URL. You can change the API URL in the environment files:

1. Development (`environment.ts`)

```typescript
export const environment = {
  production: false,
  apiUrl: "https://reqres.in/api",
};
```

2. Production (`environment.prod.ts`)

```typescript
export const environment = {
  production: true,
  apiUrl: "https://reqres.in/api",
};
```
