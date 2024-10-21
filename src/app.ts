// src/app.ts
import express, { Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from './passport'; // Import the configured passport

dotenv.config();

const app = express();
const port = 3000;

// Middleware for sessions
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for EJS views
app.set('views', path.join(__dirname, '../views'));

// Set public folder for static files
app.use(express.static(path.join(__dirname, '../public')));

// Define a simple route for home page
app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Home Page', message: 'Hello from EJS and TypeScript!' });
});

// GitHub authentication route
app.get('/auth/github', passport.authenticate('github'));

// GitHub callback route
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  }
);

// Profile route (protected)
app.get('/profile', (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  res.render('profile', { title: 'Profile Page', user: req.user });
});

// Logout route
app.get('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
