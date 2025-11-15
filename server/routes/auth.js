const express = require('express');
const router = express.Router();
const passport = require('passport');
const { register, login, getMe, googleCallback } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Regular auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// Google OAuth routes
router.get(
    '/google',
    passport.authenticate('google', { 
        scope: ['profile', 'email'] 
    })
    );

    router.get(
    '/google/callback',
    passport.authenticate('google', { 
        failureRedirect: `${process.env.CLIENT_URL}/login`,
        session: false 
    }),
    googleCallback
);

module.exports = router;