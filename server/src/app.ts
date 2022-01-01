import express from 'express';
import submit from '@root/routes/submit';
import problems from '@root/routes/problems';

const app = express();

app.use(express.json());

app.use('/api/submit', submit);
app.use('/api/problems', problems);

app.get('/', (_, res) => {
    res.send('Welcome to the Mobile Code API');
});

export default app;
