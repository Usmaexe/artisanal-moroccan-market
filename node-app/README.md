# Artisanal Moroccan Market - Backend API

This is the backend API for an artisanal Moroccan marketplace platform, providing endpoints for managing artisans, products, customers, orders, authentication, and more.

## Tech Stack

- Node.js & Express
- PostgreSQL database
- Prisma ORM
- JWT authentication
- Express-validator for input validation
- Security packages (helmet, bcrypt)

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- PostgreSQL database

### Installation

1. Clone the repository
2. Navigate to the node-app directory:
   ```
   cd artisanal-moroccan-market/node-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Copy the `.env-template` to create your own `.env` file:
   ```
   cp .env-template .env
   ```
5. Update the `.env` with your configuration values

### Database Setup

1. Make sure PostgreSQL is running
2. Generate Prisma client:
   ```
   npm run prisma:generate
   ```
3. Run migrations to set up your database schema:
   ```
   npm run prisma:migrate
   ```
4. (Optional) Explore your database with Prisma Studio:
   ```
   npm run prisma:studio
   ```

## Running the Application

### Development mode

```
npm run dev
```

This starts the server with nodemon for automatic reloading on code changes.

### Production mode

```
npm start
```

## API Endpoints

The API is structured around the following resources:

- `/api/auth` - Authentication (login, register)
- `/api/artisans` - Artisan management
- `/api/products` - Product catalog
- `/api/categories` - Product categorization
- `/api/customers` - Customer profiles
- `/api/orders` - Order processing
- `/api/reviews` - Product reviews

Detailed API documentation is available in the routes directory.

## Testing

Run tests with:

```
npm test
```

## Environment Variables

See `.env-template` for required environment variables.

## License

MIT