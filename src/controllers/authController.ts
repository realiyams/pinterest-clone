import { Request, Response } from 'express';
import passport from '../passport'; // Impor passport di sini

// Halaman utama
export const getHomePage = (req: Request, res: Response) => {
  res.render('index', { title: 'Home', user: req.user });
};

// Otentikasi GitHub
export const githubAuthenticate = (req: Request, res: Response, next: Function) => {
  passport.authenticate('github')(req, res, next);
};

// Callback setelah otentikasi GitHub
export const githubCallback = (req: Request, res: Response) => {
  passport.authenticate('github', { failureRedirect: '/' }, (err: any, user: any, info: any) => { 
    if (err) {
      return res.redirect('/');
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.redirect('/');
      }
      // Berhasil login
      res.redirect('/');
    });
  })(req, res);
};

// Logout user
export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
};
