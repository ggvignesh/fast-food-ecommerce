USE fast_food_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    category_id INT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Cart table
CREATE TABLE IF NOT EXISTS cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    delivery_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample food items
INSERT INTO products (name, description, price, image_url) VALUES
('Classic Burger', 'Juicy beef patty with fresh vegetables and special sauce', 8.99, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500'),
('Cheese Pizza', 'Classic margherita pizza with mozzarella and tomato sauce', 12.99, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500'),
('Chicken Wings', 'Crispy wings with your choice of sauce', 10.99, 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500'),
('French Fries', 'Crispy golden fries with seasoning', 4.99, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500'),
('Chicken Sandwich', 'Grilled chicken with lettuce and mayo', 7.99, 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500'),
('Caesar Salad', 'Fresh romaine lettuce with Caesar dressing and croutons', 6.99, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500'),
('Soft Drink', 'Refreshing carbonated drink', 2.99, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500'),
('Ice Cream', 'Creamy vanilla ice cream with chocolate sauce', 3.99, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500');

-- Verify the data
SELECT * FROM products;