# Node Boilerplate Project

## Overview

Node Boilerplate Project (`node_ts`) provides a robust starting point for developing Node.js applications. It comes pre-configured with essential tools and libraries to streamline the development process. This project aims to provide a scalable and maintainable foundation, making it suitable for various projects, from small prototypes to large-scale applications.

## Features

- **TypeScript Integration**: Built with TypeScript for enhanced type safety and better code organization.
- **Automatic Restart**: Utilizes `nodemon` for automatic server restarts during development, improving the development experience.
- **Logging**: Integrated with `bunyan` for efficient logging, making it easier to track application behavior and debug issues.
- **Middleware**: Includes essential middleware for Express applications such as `cors`, `helmet`, and `compression`, enhancing security and performance.
- **Environment Variables**: Pre-configured with `dotenv` for managing environment variables, ensuring better configuration management across environments.
- **Authentication**: Supports JWT authentication with `jsonwebtoken` and `passport-js`, enabling secure user authentication.
- **Database Integration**: Integrated with `mongoose` for `mongoDB`, facilitating database operations and data modeling.
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
- `seed:admin:dev`: Seeds the admin user into the database on development.
- `seed:admin:prod`: Seeds the admin user into the database on production.

## Contributing

Thank you for considering contributing to the Node Boilerplate Project! Contributions are welcome and greatly appreciated. To ensure a smooth contribution process, please follow these guidelines:

### Pull Requests

When submitting a pull request, please provide a clear and descriptive title that summarizes the purpose of the changes. This helps reviewers understand the scope of the pull request at a glance. Here's a general format for pull request titles:

[Improvement/Fix]: Brief Description

For example:

- `[Feature]: Add support for sending SMS notifications`
- `[Bug Fix]: Resolve issue with user authentication`

### Updating README

If your pull request introduces a new library, feature, or script, please ensure to update the `README.md` file accordingly. Add a section detailing the new addition, including its purpose, usage instructions, and any relevant configuration details.

### Adding Screenshots

If your contribution involves fixing a visual bug or introducing a new UI feature, consider including screenshots or GIFs demonstrating the changes. This provides visual context for reviewers and users, helping them understand the impact of the changes.

### Code Quality

Maintaining code quality is essential. Before submitting a pull request, ensure that your code adheres to the project's coding standards and conventions. Run linting and formatting scripts to catch any errors or inconsistencies.

### Testing

If applicable, include unit tests or integration tests for your changes. Testing helps ensure the reliability and stability of the codebase. Write clear test cases that cover both expected and edge cases.

### Review

Be open to feedback and constructive criticism from reviewers. Respond promptly to any comments or suggestions and address any requested changes thoroughly. Collaboration and communication are key to successful contributions.

Thank you for contributing to the Node Boilerplate Project!

## License

This project is licensed under the ISC License.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact the author.
