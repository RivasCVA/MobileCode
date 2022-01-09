import express from 'express';
import submit from '@root/routes/submit';
import problems from '@root/routes/problems';
import users from '@root/routes/users';

const app = express();

app.use(express.json());

app.use('/api/submit', submit);
app.use('/api/problems', problems);
app.use('/api/users', users);

app.get('/', (_, res) => {
    res.send('Welcome to the Mobile Code API');
});

export default app;
