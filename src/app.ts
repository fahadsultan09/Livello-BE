import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.ts';
import config from './config.json' // configurations

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const { mongoose: { url } } = config
console.log("URL ----", url)
mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

export default app;
