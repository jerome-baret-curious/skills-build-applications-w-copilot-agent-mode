import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes';
import { SERVER_CONFIG } from './config';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker API');
});

app.get('/api/config', (_req, res) => {
  res.json({
    apiUrl: SERVER_CONFIG.apiUrl,
    isCodespaces: SERVER_CONFIG.isCodespaces,
    codespaceName: SERVER_CONFIG.codespaceName,
  });
});

app.use('/api', apiRouter);

mongoose.connect(SERVER_CONFIG.mongoUri)
  .then(() => {
    console.log(`Connected to MongoDB at ${SERVER_CONFIG.mongoUri}`);
    app.listen(SERVER_CONFIG.port, () => {
      console.log(`Server listening on ${SERVER_CONFIG.port}`);
      console.log(`API available at ${SERVER_CONFIG.apiUrl}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });
