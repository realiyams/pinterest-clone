import { Router } from 'express';
import * as authController from '../controllers/authController'; // Adjust the import path based on your project structure
import passport from '../passport'; // Adjust the import path based on your project structure

const router = Router();

// Define a simple route for home page
router.get('/', authController.getHomePage);

// GitHub authentication route
router.get('/auth/github', authController.githubAuthenticate);

// GitHub callback route
router.get('/auth/github/callback', authController.githubCallback);

// Profile route (protected)
router.get('/profile', authController.getProfilePage);

// Logout route
router.get('/logout', authController.logout);

export default router;
