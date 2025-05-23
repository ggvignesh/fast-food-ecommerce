const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ggvignesh15',
    database: 'fast_food_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection and clear duplicate products
async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully');

        // Clear existing products
        await connection.query('DELETE FROM products');
        
        // Insert all products with correct column names and images
        await connection.query(`
            INSERT INTO products (name, description, price, image_url) VALUES 
            -- Existing Items
            ('Classic Burger', 'Juicy beef patty with fresh vegetables and special sauce', 8.99, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500'),
            ('Cheese Pizza', 'Classic margherita pizza with mozzarella and tomato sauce', 12.99, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500'),
            ('Chicken Wings', 'Crispy wings with your choice of sauce', 10.99, 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500'),
            ('French Fries', 'Crispy golden fries with seasoning', 4.99, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500'),
            ('Grilled Chicken Burger', 'Grilled chicken patty with lettuce and mayo', 7.99, 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500'),
            ('Caesar Salad', 'Fresh romaine lettuce with Caesar dressing and croutons', 6.99, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500'),
            ('Soft Drink', 'Refreshing carbonated drink', 2.99, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500'),
            ('Ice Cream', 'Creamy vanilla ice cream with chocolate sauce', 3.99, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500'),
            
            -- New Items
            ('Veggie Burger', 'Plant-based patty with fresh vegetables', 9.99, 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg'),
            ('Pepperoni Pizza', 'Classic pizza loaded with pepperoni', 14.99, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500'),
            ('Fish & Chips', 'Crispy battered fish with golden fries', 11.99, 'https://cdn.pixabay.com/photo/2016/06/28/17/32/fish-and-chips-1485014_1280.jpg'),
            ('Chocolate Cake', 'Rich chocolate cake with ganache', 6.99, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500'),
            ('Chicken Nuggets', 'Crispy breaded chicken pieces', 7.99, 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500'),
            ('Chicken Sandwich', 'Grilled chicken with fresh vegetables in a bun', 7.99, 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500'),
            ('Milkshake', 'Creamy chocolate milkshake with whipped cream', 4.99, 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500'),
            ('Taco', 'Crispy taco shell with seasoned beef and toppings', 8.99, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500'),
            ('Cheesecake', 'New York style cheesecake with berry sauce', 7.99, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500'),
            ('Chicken Wrap', 'Grilled chicken with vegetables in tortilla', 8.99, 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500'),
            ('Mozzarella Sticks', 'Breaded mozzarella with marinara sauce', 6.99, 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=500'),
            ('Brownie', 'Warm chocolate brownie with ice cream', 5.99, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500'),
            ('Chicken Quesadilla', 'Grilled chicken and cheese in tortilla', 9.99, 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500'),
            ('Fruit Smoothie', 'Fresh fruit smoothie with yogurt', 4.99, 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=500'),
            ('Chocolate Chip Cookie', 'Warm chocolate chip cookie', 3.99, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500'),
            ('Chicken Pasta', 'Creamy pasta with grilled chicken', 10.99, 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500')
        `);

        console.log('Products reset successfully');
        connection.release();
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

// Initialize database
initializeDatabase();

module.exports = pool;