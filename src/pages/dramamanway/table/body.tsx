import React, { FC, useEffect, useState } from 'react';
import Row from './row';
import { useStore } from '../../../hooks';
import { DramamanwayPost } from '../../../types';
import { DRAMAMANWAY_TEMPLATE } from '../../../lib/dramamanway-template';
import { parseDramamanwayPost } from '../../../lib';

type BodyProps = {};

const Body: FC<BodyProps> = ({}) => {
    // const [posts, fetch] = useStore((state) => [
    //     state.dramamanwayPosts,
    //     state.fetchDramamanwayPosts,
    // ]);
    const [posts, setPosts] = useState<DramamanwayPost[]>([]);

    const fetch = async () => {
        for await (const post of parseDramamanwayPost()) {
            setPosts((allPosts) => [...allPosts, post]);
        }
    };

    return (
        <div>
            <button onClick={fetch as () => void}>fetch</button>
            {posts.map((p) => (
                <Row value={p} key={p.id} />
            ))}
        </div>
    );
};

export default Body;
