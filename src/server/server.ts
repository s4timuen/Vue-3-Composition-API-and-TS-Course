import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Post } from '@/models/post';

import { today, week, month } from '../tests/models/mock_data/posts'; // todo: test data
const allPosts = [today, week, month]; // todo: test data

const port = 8090;

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// endpoints
app.get('/posts', (req, res) => {
    res.json(allPosts);
});
app.post<{}, {}, Post>('/posts', (req, res) => {
    const post: Post = { ...req.body };
    allPosts.push(post);
    res.json(post);
});

app.listen(port, () => { console.log(`Listening on port ${port}`) });
