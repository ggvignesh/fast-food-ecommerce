const Product = require('../models/product.model');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, image_url } = req.body;
        const productId = await Product.create({ name, price, description, image_url });
        res.status(201).json({ message: 'Product created successfully', id: productId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
}; 