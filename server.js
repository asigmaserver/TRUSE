require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;

const app = express();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID,             // 1381144719371014144
  clientSecret: process.env.CLIENT_SECRET,     // vfSyrK74YqEoZVw58pJV-ThbKvepJza2
  callbackURL: process.env.CALLBACK_URL,       // https://trusev1.glitch.me/auth/discord/callback
  scope: ['email']                             // Only requesting email scope per your request
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => done(null, profile));
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret_here',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => res.redirect('/dashboard')
);

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.send(`Hello, ${req.user.username || req.user.id}! <a href="/logout">Logout</a>`);
});

app.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

app.get('/', (req, res) => {
  res.send('<a href="/auth/discord">Login with Discord</a>');
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));