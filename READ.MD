# Node Boilerplate Project

## Description

Node Boilerplate Project (node_ts) is a comprehensive starting point for Node.js applications. It comes pre-configured with a set of tools and libraries to kickstart your development process efficiently. This project is designed to be scalable and maintainable, making it suitable for both beginners and experienced developers.

## Features

- Pre-configured with TypeScript for type safety.
- Utilizes `nodemon` for automatic restarts during development.
- Integrated with `bunyan` for logging.
- Includes essential middleware for Express applications such as `cors`, `helmet`, and `compression`.
- Pre-configured with `dotenv` for environment variable management.
- Supports JWT authentication with `jsonwebtoken` and Passport.
- Database integration with Mongoose for MongoDB.
- Email sending capabilities with `@sendgrid/mail`.

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/barender-singh/node_ts.git
```

2. Navigate to the project directory:

```bash
   cd node_bp
```

3. Install dependencies:

```bash
   npm install
```

## Usage

### Development

To start the development server, run:

```bash
    npm run dev
```

### Production

To start the application in production mode, run:

```bash
    npm run build
```

```bash
    npm start
```

## Scripts

- `dev`: Starts the development server with hot reloading.
- `start`: Starts the application in production mode.
- `lint:check`: Checks the code for linting errors.
- `lint:fix`: Fixes linting errors automatically.
- `prettier:check`: Checks the code formatting.
- `prettier:fix`: Fixes code formatting issues.
- `build`: Compiles TypeScript and builds the project.

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting any pull requests.

## License

This project is licensed under the ISC License.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact the author.
