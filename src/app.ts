import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from './passport';
import router from './routes/index'; // Import routes

// src/index.ts or wherever you're initializing models
import './../models/assosiations';

const app = express();
const port = 3000;

// Import livereload and connect-livereload
import livereload from 'livereload';
import connectLiveReload from 'connect-livereload';


// Create a LiveReload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, '../views'));  // Watch views folder
liveReloadServer.watch(path.join(__dirname, '../public')); // Watch public folder

// Middleware for LiveReload
app.use(connectLiveReload());

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Notify LiveReload server on changes
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
