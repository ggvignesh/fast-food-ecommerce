// API endpoints
const API_URL = 'http://localhost:5000/api';

// State management
let currentUser = null;
let token = localStorage.getItem('token');

// UI Functions
function showSection(sectionId) {
    document.querySelectorAll('.container > div').forEach(div => {
        div.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function showProducts() {
    showSection('products-section');
    loadProducts();
}

function showCart() {
    if (!token) {
        alert('Please login to view cart');
        return;
    }
    showSection('cart-section');
    loadCart();
}

function showOrders() {
    if (!token) {
        alert('Please login to view orders');
        return;
    }
    showSection('orders-section');
    loadOrders();
}

function showLogin() {
    showSection('login-form');
}

function showRegister() {
    showSection('register-form');
}

// API Functions
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        const productsList = document.getElementById('products-list');
        
        productsList.innerHTML = products.map(product => `
            <div class="col-md-4">
                <div class="product-card">
                    <img src="${product.image_url}" class="product-image" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">$${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

async function loadCart() {
    try {
        const response = await fetch(`${API_URL}/cart`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const cartItems = await response.json();
        const cartItemsDiv = document.getElementById('cart-items');
        
        cartItemsDiv.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <img src="${item.image_url}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${item.price}</p>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.product_id})">Remove</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const orders = await response.json();
        const ordersList = document.getElementById('orders-list');
        
        ordersList.innerHTML = orders.map(order => `
            <div class="order-card">
                <h4>Order #${order.id}</h4>
                <p>Total: $${order.total_amount}</p>
                <p>Status: ${order.status}</p>
                <p>Date: ${new Date(order.created_at).toLocaleDateString()}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// Cart Functions
async function addToCart(productId) {
    if (!token) {
        alert('Please login to add items to cart');
        return;
    }
    
    try {
        await fetch(`${API_URL}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        alert('Item added to cart');
        loadCart();
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

async function removeFromCart(productId) {
    try {
        await fetch(`${API_URL}/cart/remove/${productId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadCart();
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}

async function placeOrder() {
    const deliveryAddress = prompt('Please enter your delivery address:');
    if (!deliveryAddress) return;

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ deliveryAddress })
        });
        
        if (response.ok) {
            alert('Order placed successfully!');
            showOrders();
        } else {
            alert('Error placing order');
        }
    } catch (error) {
        console.error('Error placing order:', error);
    }
}

// Auth Functions
async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password')
            })
        });
        
        const data = await response.json();
        if (response.ok) {
            token = data.token;
            localStorage.setItem('token', token);
            currentUser = data.user;
            showProducts();
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Error logging in. Please try again.');
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            })
        });
        
        const data = await response.json();
        if (response.ok) {
            token = data.token;
            localStorage.setItem('token', token);
            currentUser = data.user;
            showProducts();
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Error registering. Please try again.');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showProducts();
}); 