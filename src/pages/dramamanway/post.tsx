import React, { FC } from 'react';
import type { DramamanwayPost } from '../../types';

type PostProps = {
    value: DramamanwayPost;
};

const Post: FC<PostProps> = ({ value }) => {
    return (
        <div>
            <p>{value.text}</p>
            {/*<img src={value.image} />*/}
        </div>
    );
};

export default Post;
