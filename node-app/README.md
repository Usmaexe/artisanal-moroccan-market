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

### Authentication
- `POST /api/auth/register` - Register a new customer account
  - Body: `{ "email": "user@example.com", "password": "password123" }`
- `POST /api/auth/login` - Authenticate a user and retrieve JWT token
  - Body: `{ "email": "user@example.com", "password": "password123" }`

### Products
- `GET /api/products` - List all products with category, artisan, and review data
- `GET /api/products/:id` - Get detailed information about a specific product
- `POST /api/products` - Create a new product (requires authentication)
  - Body: `{ "name": "product name", "description": "...", "price": 199.99, "category_id": 1, "artisan_id": 1, "image_url": "..." }`
- `PUT /api/products/:id` - Update product information
- `DELETE /api/products/:id` - Remove a product

### Categories
- `GET /api/categories` - List all product categories with associated products
- `GET /api/categories/:id` - Get category details with associated products
- `POST /api/categories` - Create a new category
  - Body: `{ "name": "category name", "image_url": "..." }`
- `PUT /api/categories/:id` - Update category information
- `DELETE /api/categories/:id` - Remove a category

### Artisans
- `GET /api/artisans` - List all artisans with their products
- `GET /api/artisans/:id` - Get detailed information about a specific artisan
- `POST /api/artisans` - Create a new artisan profile
  - Body: `{ "name": "artisan name", "bio": "...", "image_url": "...", "location": "..." }`
- `PUT /api/artisans/:id` - Update artisan information
- `DELETE /api/artisans/:id` - Remove an artisan

### Customers
- `GET /api/customers` - List all customers (admin only)
- `GET /api/customers/:id` - Get customer details
- `POST /api/customers` - Create a customer account
  - Body: `{ "email": "user@example.com", "password_hash": "..." }`
- `PUT /api/customers/:id` - Update customer information
- `DELETE /api/customers/:id` - Remove a customer

### Reviews
- `GET /api/reviews` - List all product reviews with product and customer data
- `GET /api/reviews/:id` - Get detailed information about a specific review
- `POST /api/reviews` - Create a new product review
  - Body: `{ "rating": 5, "comment": "Great product!", "product_id": 1, "customer_id": 1 }`
- `PUT /api/reviews/:id` - Update review content
- `DELETE /api/reviews/:id` - Remove a review

All API responses are in JSON format. Error responses include appropriate HTTP status codes and error messages.

### Authentication
Most operations that modify data (POST, PUT, DELETE) require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Status Codes
- `200 OK` - Request succeeded
- `201 Created` - Resource created 
- `204 No Content` - Resource deleted
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Testing

Run tests with:

```
npm test
```

## Environment Variables

See `.env-template` for required environment variables.

## License

MIT