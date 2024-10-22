import { Request, Response } from 'express';

// Halaman profil pengguna
export const getProfilePage = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  
  // Render view profile dengan data pengguna
  res.render('profile', {
    title: 'Profile Page',
    user: req.user
  });
};
