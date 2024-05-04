import React, { FC } from 'react';
import Row from './row';
import { parseDramamanwayPost } from '../../../lib';

type BodyProps = {};

const Body: FC<BodyProps> = ({}) => {
    const posts = parseDramamanwayPost();

    return (
        <div>
            {posts.map((p) => (
                <Row value={p} key={p.id} />
            ))}
        </div>
    );
};

export default Body;
