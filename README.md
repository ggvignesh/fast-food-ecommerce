# Fast Food E-commerce Website

A full-stack web application for a fast food restaurant with features like menu browsing, cart management, and order placement.

## Features

- User authentication (register/login)
- Browse food menu with images
- Add items to cart
- Place orders
- View order history
- Responsive design

## Tech Stack

- Frontend: HTML, CSS, JavaScript, Bootstrap
- Backend: Node.js, Express.js
- Database: MySQL

## Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies
```bash
npm install
```

3. Set up MySQL database
```sql
CREATE DATABASE fast_food_db;
```

4. Configure database connection
Update the database configuration in `config/database.js` with your MySQL credentials.

5. Start the server
```bash
npm run dev
```

6. Visit `http://localhost:5000` in your browser

## Project Structure

- `public/` - Frontend files (HTML, CSS, JS)
- `config/` - Database configuration
- `controllers/` - Request handlers
- `routes/` - API routes
- `server.js` - Main application file

## API Endpoints

- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/products` - Get all products
- POST `/api/cart` - Add to cart
- GET `/api/cart` - Get cart items
- POST `/api/orders` - Place order
- GET `/api/orders` - Get order history

## License

MIT 