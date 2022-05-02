import express from 'express';
import submission from '@root/routes/submission';
import problems from '@root/routes/problems';
import users from '@root/routes/users';

const app = express();

app.use(express.json());

app.use('/api/submission', submission);
app.use('/api/problems', problems);
app.use('/api/users', users);

app.get('/', (_, res) => {
    res.send('Welcome to the Mobile Code API');
});

export default app;
