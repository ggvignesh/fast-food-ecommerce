const Cart = require('../models/cart.model');

exports.getCart = async (req, res) => {
    try {
        const cartItems = await Cart.getCartItems(req.user.id);
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart' });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        await Cart.addToCart(req.user.id, productId, quantity);
        res.json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart' });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        await Cart.removeFromCart(req.user.id, productId);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart' });
    }
};

exports.clearCart = async (req, res) => {
    try {
        await Cart.clearCart(req.user.id);
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart' });
    }
}; 