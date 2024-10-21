import express from 'express';
import * as authController from '../controllers/authController';
import * as profileController from '../controllers/profileController';

const router = express.Router();

// Rute halaman utama
router.get('/', authController.getHomePage);

// Otentikasi GitHub
router.get('/auth/github', authController.githubAuthenticate);

// Callback GitHub
router.get('/auth/github/callback', authController.githubCallback);

// Halaman profil
router.get('/profile', profileController.getProfilePage);

// Logout user
router.get('/logout', authController.logout);

export default router;
