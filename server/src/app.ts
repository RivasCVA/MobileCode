import express from 'express';
import test from '@root/routes/test';

const app = express();

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/api/test', test);

app.get('/', (_, res) => {
    res.send('Welcome to the Mobile Code API');
});

export default app;
