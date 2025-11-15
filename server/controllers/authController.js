// authController.js - Controller for authentication operations

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
    
        // Check if user already exists
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({
                success: false,
                error: 'User already exists with this email',
            });
        }
        
        // Create user
        const user = await User.create({
            name,
            email,
            password,
        });
    
        // Generate token
        const token = generateToken(user._id);
        
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide email and password',
            });
        }
        
        // Check for user (include password for comparison)
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
            });
        }
        
        // Check if password matches
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
            });
        }
    
        // Generate token
        const token = generateToken(user._id);
        
        res.json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        
        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
exports.googleCallback = async (req, res, next) => {
    try {
        // Generate token for the authenticated user
        const token = generateToken(req.user._id);

        // Redirect to frontend with token
        res.redirect(`${process.env.CLIENT_URL}/auth/google/success?token=${token}`);
    } catch (error) {
        next(error);
    }
};