import app from '@root/app';
import Debug from '@root/util/debug';

const PORT = 3000;

app.listen(PORT, () => {
    Debug.server(`Listening on port ${PORT}: http://localhost:${PORT}`);
});
