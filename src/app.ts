import express, { Request, Response } from 'express';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GitHubStrategy } from 'passport-github';
import dotenv from 'dotenv';

dotenv.config();

import { User } from '../models/user';

const app = express();
const port = 3000;

// In the GitHub strategy callback
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: process.env.GITHUB_CALLBACK_URL!
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    // Find or create a user in the database
    let user = await User.findOne({ where: { githubId: profile.id } });

    if (!user) {
      user = await User.create({
        username: profile.username!,
        githubId: profile.id,
        profileUrl: profile.profileUrl!,
        avatarUrl: profile.photos?.[0].value || '',
      });
    }

    return cb(null, user);
  } catch (error) {
    return cb(error);
  }
}));

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((obj: any, done: (err: any, user?: any) => void) => {
  done(null, obj);
});


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
