import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from './passport';
import router from './routes/index'; // Import routes

const app = express();
const port = 3000;

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

// Use routes
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
