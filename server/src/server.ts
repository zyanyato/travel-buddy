import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// const _filename = fileURLToPath(import.meta.url);
// const _dirname = path.dirname(_filename);


const app = express();

const PORT = process.env.PORT || 3001;


// TODO: Serve static files of entire client dist folder
app.use(express.static('../client/dist'));
// app.use(express.static('public'));


// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true})); //Parses URL-encoded data with the querystring library
app.use(express.json()); //Parses incoming JSON requests and puts the parsed data in req.body


// TODO: Implement middleware to connect the routes
app.use(routes);
// app.get('/', (_req: Request, res:Response) => res.send('Navigate to /send or /routes'));

// app.get('/weather', (_req: Request, res:Response) => {
//     res.sendFile(path.join(_dirname, '../server/src/routes/api/index.ts'))
// });

// Start the server on the port
app.listen(PORT, () => 
    console.log(`Listening on PORT: ${PORT}`)
);
