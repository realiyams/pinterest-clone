import { Request, Response } from 'express';
import passport from '../passport'; // Impor passport di sini
import { Profile } from 'passport'; // Impor tipe Profile dari passport

export const getHomePage = (req: Request, res: Response) => {
  res.render('index', { title: 'Home', user: req.user });
};

export const githubAuthenticate = (req: Request, res: Response, next: Function) => {
  passport.authenticate('github')(req, res, next);
};

export const githubCallback = (req: Request, res: Response) => {
  passport.authenticate('github', { failureRedirect: '/' }, (err: any, user: any, info: any) => { // Menentukan tipe untuk err, user, dan info
    if (err) {
      return res.redirect('/');
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.redirect('/');
      }
      // Successful authentication, redirect home.
      res.redirect('/');
    });
  })(req, res);
};

export const getProfilePage = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('profile', { title: 'Profile Page', user: req.user });
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
};
