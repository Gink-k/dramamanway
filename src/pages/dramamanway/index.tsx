import React, { FC } from 'react';
import { parseDramamanwayPost } from '../../lib';
import Post from './post';

const Dramamanway: FC = () => {
    const posts = parseDramamanwayPost();

    return (
        <div>
            {posts.map((p) => (
                <Post value={p} key={p.id} />
            ))}
        </div>
    );
};

export default Dramamanway;
