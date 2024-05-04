import React, { FC } from 'react';
import Row from './row';
import { parseDramamanwayPost } from '../../../lib';
import { useStore } from '../../../hooks';

type BodyProps = {};

const Body: FC<BodyProps> = ({}) => {
    const posts = parseDramamanwayPost();
    // const [posts, fetch] = useStore((state) => [
    //     state.dramamanwayPosts,
    //     state.fetchDramamanwayPosts,
    // ]);
    return (
        <div>
            <button>fetch</button>
            {posts.map((p) => (
                <Row value={p} key={p.id} />
            ))}
        </div>
    );
};

export default Body;
