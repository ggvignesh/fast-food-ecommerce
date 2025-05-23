const db = require('../config/database');

class Cart {
    static async getCartItems(userId) {
        const [rows] = await db.execute(`
            SELECT c.*, p.name, p.price, p.image_url 
            FROM cart c 
            JOIN products p ON c.product_id = p.id 
            WHERE c.user_id = ?
        `, [userId]);
        return rows;
    }

    static async addToCart(userId, productId, quantity = 1) {
        // Check if item already exists in cart
        const [existing] = await db.execute(
            'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
            [userId, productId]
        );

        if (existing.length > 0) {
            // Update quantity if item exists
            await db.execute(
                'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
                [quantity, userId, productId]
            );
        } else {
            // Add new item to cart
            await db.execute(
                'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
                [userId, productId, quantity]
            );
        }
    }

    static async removeFromCart(userId, productId) {
        await db.execute(
            'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
            [userId, productId]
        );
    }

    static async clearCart(userId) {
        await db.execute('DELETE FROM cart WHERE user_id = ?', [userId]);
    }
}

module.exports = Cart; 