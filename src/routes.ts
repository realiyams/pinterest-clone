// src/routes.ts
import { Router, Request, Response } from 'express';
import passport from './passport'; // Adjust the import path based on your project structure

const router = Router();

// Define a simple route for home page
router.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Home Page', message: 'Hello from EJS and TypeScript!' });
});

// GitHub authentication route
router.get('/auth/github', passport.authenticate('github'));

// GitHub callback route
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  }
);

// Profile route (protected)
router.get('/profile', (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  res.render('profile', { title: 'Profile Page', user: req.user });
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

export default router;
