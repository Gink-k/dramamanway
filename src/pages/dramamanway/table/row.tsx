import React, { FC } from 'react';
import type { DramamanwayPost } from '../../../types';

type PostProps = {
    value: DramamanwayPost;
};

const Row: FC<PostProps> = ({ value }) => {
    return (
        <div>
            <p>{value.index}</p>
            {Object.values(value.points).map((point) => (
                <p>{point.value}</p>
            ))}
            {/*<img src={value.image} />*/}
        </div>
    );
};

export default Row;
