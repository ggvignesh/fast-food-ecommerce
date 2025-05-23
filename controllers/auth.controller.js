const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.register = async (req, res) => {
    console.log('Registration attempt:', req.body); // Debug log
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            console.log('Missing fields:', { name, email, password: !!password }); // Debug log
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        console.log('Checking for existing user...'); // Debug log
        const [existingUsers] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            console.log('User already exists:', email); // Debug log
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        console.log('Hashing password...'); // Debug log
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        console.log('Creating new user...'); // Debug log
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        // Generate JWT token
        console.log('Generating token...'); // Debug log
        const token = jwt.sign(
            { id: result.insertId, email },
            'your-secret-key',
            { expiresIn: '1d' }
        );

        console.log('Registration successful for:', email); // Debug log
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: result.insertId,
                name,
                email
            }
        });
    } catch (error) {
        console.error('Registration error details:', error); // Detailed error log
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.login = async (req, res) => {
    console.log('Login attempt:', { email: req.body.email }); // Debug log
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Missing credentials:', { email: !!email, password: !!password }); // Debug log
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user exists
        console.log('Checking user credentials...'); // Debug log
        const [users] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            console.log('User not found:', email); // Debug log
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = users[0];

        // Verify password
        console.log('Verifying password...'); // Debug log
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password for:', email); // Debug log
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        console.log('Generating token...'); // Debug log
        const token = jwt.sign(
            { id: user.id, email: user.email },
            'your-secret-key',
            { expiresIn: '1d' }
        );

        console.log('Login successful for:', email); // Debug log
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error details:', error); // Detailed error log
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}; 