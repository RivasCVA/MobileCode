import express from 'express';
import Debug from '@root/util/debug';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World');
});

const PORT = 3000;
app.listen(PORT, () => {
    Debug.server(`Listening on port ${PORT}: http://localhost:${PORT}`);
});
