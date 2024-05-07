import React, { FC } from 'react';
import type { DramamanwayPost } from '../../../../types';
import styles from './styles.module.scss';
import { Score } from './score';

type PostProps = {
    value: DramamanwayPost;
};

export const Row: FC<PostProps> = ({ value }) => {
    return (
        <div className={styles.row}>
            <p className={styles.firstCell}>
                <span className={styles.index}>
                    {value.index ? `${value.index}. ` : ''}
                </span>
                <span className={styles.title}>{value.info.title.ru}</span>
            </p>
            {Object.entries(value.score).map(([key, score]) => (
                <Score value={score} key={key} />
            ))}
            {/*<img src={value.image} />*/}
        </div>
    );
};
