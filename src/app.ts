import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.ts';
import config from './config.json' // configurations

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: 'GET, POST, PUT , DELETE', // Add the allowed methods
    credentials: true, // If you need to handle cookies or authentication
  }));
app.use(express.json());

app.use('/api', routes);

const { mongoose: { url } } = config
mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

export default app;
