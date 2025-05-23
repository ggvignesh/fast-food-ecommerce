const db = require('../config/database');

class Order {
    static async create(userId, deliveryAddress, cartItems) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Calculate total amount
            const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

            // Create order
            const [orderResult] = await connection.execute(
                'INSERT INTO orders (user_id, total_amount, delivery_address) VALUES (?, ?, ?)',
                [userId, totalAmount, deliveryAddress]
            );
            const orderId = orderResult.insertId;

            // Create order items
            for (const item of cartItems) {
                await connection.execute(
                    'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                    [orderId, item.product_id, item.quantity, item.price]
                );
            }

            // Clear cart
            await connection.execute('DELETE FROM cart WHERE user_id = ?', [userId]);

            await connection.commit();
            return orderId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async getUserOrders(userId) {
        const [orders] = await db.execute(`
            SELECT o.*, 
                   GROUP_CONCAT(
                       JSON_OBJECT(
                           'product_id', oi.product_id,
                           'quantity', oi.quantity,
                           'price', oi.price
                       )
                   ) as items
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            WHERE o.user_id = ?
            GROUP BY o.id
            ORDER BY o.created_at DESC
        `, [userId]);
        return orders;
    }
}

module.exports = Order; 