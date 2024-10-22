import express from 'express';
import * as authController from '../controllers/authController';
import * as profileController from '../controllers/profileController';
import * as pictureController from '../controllers/pictureController';

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

// Rute untuk menampilkan halaman gambar
router.get('/my-pics', pictureController.getMyPicsPage);

// Rute untuk menampilkan halaman tambah gambar
router.get('/add-a-pic', pictureController.getAddPicPage);

// Rute untuk menangani upload gambar
router.post('/add-a-pic', pictureController.postAddPic);

export default router;
