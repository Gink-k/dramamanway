import React, { FC, useEffect, useState } from 'react';
import Row from './row';
import { parseDramamanwayPost } from '../../../lib';
import { useStore } from '../../../hooks';
import { DramamanwayPost } from '../../../types';

type BodyProps = {};

const Body: FC<BodyProps> = ({}) => {
    const [posts, setPosts] = useState<DramamanwayPost[]>([]);
    // const [posts, fetch] = useStore((state) => [
    //     state.dramamanwayPosts,
    //     state.fetchDramamanwayPosts,
    // ]);

    useEffect(() => {
        parseDramamanwayPost().then(setPosts);
    }, []);

    return (
        <div>
            <button onClick={() => console.log('here!!!!!!!!!')}>fetch</button>
            {posts.map((p) => (
                <Row value={p} key={p.id} />
            ))}
        </div>
    );
};

export default Body;
