import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for EJS views
app.set('views', path.join(__dirname, '../views'));

// Set public folder for static files
app.use(express.static(path.join(__dirname, '../public')));

// Define a simple route
app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Home Page', message: 'Hello from EJS and TypeScript!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
