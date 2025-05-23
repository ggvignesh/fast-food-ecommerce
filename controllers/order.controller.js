const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

exports.createOrder = async (req, res) => {
    try {
        const { deliveryAddress } = req.body;
        
        // Get cart items
        const cartItems = await Cart.getCartItems(req.user.id);
        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Create order
        const orderId = await Order.create(req.user.id, deliveryAddress, cartItems);
        
        res.status(201).json({
            message: 'Order placed successfully',
            orderId
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.getUserOrders(req.user.id);
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
}; 