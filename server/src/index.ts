import express from 'express';
import Debug from '@root/util/debug';
import run from '@root/routes/run';

const PORT = 3000;
const app = express();

app.use(express.json());

app.use('/api/run', run);

app.get('/', (_, res) => {
    res.send('Welcome to the Mobile Code API');
});

app.listen(PORT, () => {
    Debug.server(`Listening on port ${PORT}: http://localhost:${PORT}`);
});
