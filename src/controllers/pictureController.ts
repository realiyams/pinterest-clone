import { Request, Response } from 'express';
import Image from '../../models/image';
import User from '../../models/user';

declare global {
  namespace Express {
    interface User {
      id: number
    }
  }
}

// Render halaman dengan semua gambar beserta avatar pengguna
export const getAllPicsPage = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ambil semua gambar bersama dengan informasi pengguna (misal: avatar dan username)
    const images = await Image.findAll({
      include: [
        {
          model: User,
          attributes: ['avatarUrl', 'username'], // Ambil avatar dan username pengguna
        },
      ],
    });

    // Kirim user (jika ada) ke view, atau null jika tidak login
    res.render('index', { title: 'All Pictures', images, user: req.user || null });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.render('index', {
      title: 'All Pictures',
      images: [],
      user: req.user || null, // Tetap kirim user null jika terjadi error
      error: 'An error occurred while fetching the pictures.',
    });
  }
};

// Render My Pics page for the authenticated user
export const getMyPicsPage = async (req: Request, res: Response): Promise<void> => {
  // Check if the user is authenticated
  if (!req.isAuthenticated()) {
    return res.redirect('/'); // Redirect to home if not authenticated
  }

  try {
    const userId = req.user?.id; // Get userId from the authenticated user

    // Fetch images associated with the user
    const images = await Image.findAll({ where: { userId } });

    // Render My Pics page with the fetched images
    res.render('myPic', { title: 'My Pictures', user: req.user, images });
  } catch (error) {
    console.error('Error fetching images:', error);
    // Render My Pics page with an error message if something goes wrong
    res.render('myPic', {
      title: 'My Pictures',
      user: req.user,
      images: [],
      error: 'An error occurred while fetching your images.'
    });
  }
};

// Render halaman untuk menambahkan gambar
export const getAddPicPage = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/'); // Redirect jika user belum login
  }
  res.render('addPic', { title: 'Add a Pic', user: req.user });
};

// Handle image upload from URL
export const postAddPic = async (req: Request, res: Response): Promise<void> => {
  // Check if the user is authenticated
  if (!req.isAuthenticated()) {
    return res.redirect('/'); // Redirect to home if not authenticated
  }

  const { url, description } = req.body;

  // Validate input fields
  if (!url || !description) {
    // If fields are missing, render the add picture page with an error message
    return res.render('add-a-pic', {
      error: 'All fields are required!',
      url, // Keep the input values in case of an error
      description
    });
  }

  try {
    // Get the userId from the authenticated user
    const userId = req.user?.id; // Destructure userId from req.user

    // Ensure userId is available before proceeding
    if (!userId) {
      return res.render('add-a-pic', {
        error: 'User not found. Please log in again.',
        url,
        description
      });
    }

    // Save image data to the database, including userId
    await Image.create({
      url,
      description,
      stars: 0, // Start with 0 likes (stars)
      userId, // Include userId here
    });

    // After successful save, render the My Pics page or redirect if necessary
    return res.redirect('/my-pics'); // Redirect to My Pics page
  } catch (error) {
    // Log the error for debugging
    console.error('Error saving image:', error);

    // If an error occurs during saving, render the add picture page with an error message
    return res.render('add-a-pic', {
      error: 'An error occurred while saving the image.',
      url, // Keep the input values
      description
    });
  }
};
