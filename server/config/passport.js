// passport.js - Passport configuration for Google OAuth

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Only configure Google OAuth if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CALLBACK_URL) {
    passport.use(
        new GoogleStrategy(
            {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
        async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists
            let user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
            // User exists, return user
            return done(null, user);
        }

            // Create new user
            user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: Math.random().toString(36).slice(-8), // Random password
            avatar: profile.photos[0]?.value || 'default-avatar.jpg',
            googleId: profile.id,
            });

            done(null, user);
        } catch (error) {
            done(error, null);
        }
        }
    )
    );
} else {
    console.log('Google OAuth not configured - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALLBACK_URL not provided');
}

passport.serializeUser((user, done) => {
    done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;