// src/passport.ts
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import dotenv from 'dotenv';
import { User } from '../models/user'; // Adjust the import path based on your project structure

dotenv.config();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: process.env.GITHUB_CALLBACK_URL!
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    console.log(profile);
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

export default passport;
