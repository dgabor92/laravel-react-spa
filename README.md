# Laravel-React-SPA

This is a starter template for building a Single Page Application (SPA) using Laravel and React.

## Installation

###Backend:

- php: 8.1
- laravel/framwork: 10.10
- tymon/jwt-auth
- maatwebsite/excel

###Frontend:

- react
- typescript
- react-router-dom
- tanstack/react-query
- axios
- tailwindcss
- vite

```
- Move into the _backend_ directory
- Copy `.env.example` file to `.env`.
- Edit the `.env` file and set your database connection details.
- Run `composer install` to install PHP dependencies.
- Run `php artisan migrate` to create the database tables.
- Run `php artisan jwt:secret` to generate the JWT secret key.
- Run `php artisan serve` to start the local development server.
```

```
- Move into the _frontend_ directory
- Copy `.env.example` file to `.env`.
- Edit the `.env` file.
- Run `npm install` to install JavaScript dependencies.
- Run `npm run dev` to compile the assets.
```
