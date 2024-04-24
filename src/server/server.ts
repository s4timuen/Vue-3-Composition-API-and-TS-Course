import express from 'express';
import cors from 'cors';
import { today, week, month } from '../tests/models/mock_data/posts'; // todo: test data

const port = 8090;

const app = express();

// middleware
app.use(cors());

// endpoints
app.get('/posts', (req, res) => {
    res.json([today, week, month]);
});

app.listen(port, () => { console.log(`Listening on port ${port}`) });
