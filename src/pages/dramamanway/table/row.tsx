import React, { FC } from 'react';
import type { DramamanwayPost } from '../../../types';
import styles from './styles.module.scss';

type PostProps = {
    value: DramamanwayPost;
};

const Row: FC<PostProps> = ({ value }) => {
    return (
        <div className={styles.row}>
            <p>{value.index}</p>
            {Object.entries(value.score).map(([key, point]) => (
                <p key={key}>{point.value}</p>
            ))}
            <p dangerouslySetInnerHTML={{ __html: value.feedback }}></p>
            {/*<img src={value.image} />*/}
        </div>
    );
};

export default Row;
