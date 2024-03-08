# Node Boilerplate Project

## Overview

Node Boilerplate Project (`node_bp`) provides a robust starting point for developing Node.js applications. It comes pre-configured with essential tools and libraries to streamline the development process. This project aims to provide a scalable and maintainable foundation, making it suitable for various projects, from small prototypes to large-scale applications.

## Features

- **TypeScript Integration**: Built with TypeScript for enhanced type safety and better code organization.
- **Automatic Restart**: Utilizes `nodemon` for automatic server restarts during development, improving the development experience.
- **Logging**: Integrated with `bunyan` for efficient logging, making it easier to track application behavior and debug issues.
- **Middleware**: Includes essential middleware for Express applications such as `cors`, `helmet`, and `compression`, enhancing security and performance.
- **Environment Variables**: Pre-configured with `dotenv` for managing environment variables, ensuring better configuration management across environments.
- **Authentication**: Supports JWT authentication with `jsonwebtoken` and Passport, enabling secure user authentication.
- **Database Integration**: Integrated with Mongoose for MongoDB, facilitating database operations and data modeling.
- **Email Sending**: Includes email sending capabilities with `@sendgrid/mail`, allowing applications to send transactional emails.
- **Linting and Formatting**: Provides linting and code formatting scripts (`lint:check`, `lint:fix`, `prettier:check`, `prettier:fix`) for maintaining code quality and consistency.
- **Scalable Architecture**: Designed to be scalable and maintainable, suitable for projects of any size and complexity.

## Installation

1. **Clone the Repository:**

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
- `seed:admin`: Seeds the admin user into the database.

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting any pull requests.

## License

This project is licensed under the ISC License.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact the author.
