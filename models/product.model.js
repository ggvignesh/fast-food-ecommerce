const db = require('../config/database');

class Product {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM products');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(productData) {
        const { name, price, description, image_url } = productData;
        const [result] = await db.execute(
            'INSERT INTO products (name, price, description, image_url) VALUES (?, ?, ?, ?)',
            [name, price, description, image_url]
        );
        return result.insertId;
    }
}

module.exports = Product; 