import React, { FC } from 'react';
import type { DramamanwayPost } from '../../../../types';
import styles from './styles.module.scss';
import { Score } from './score';
import cx from 'classnames';
import { MAX_SCORE_VALUE } from '../../../../constants';

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
                <span
                    className={cx(styles.title, {
                        [styles.bestScore]:
                            value.score.finalScore.value === MAX_SCORE_VALUE,
                    })}
                >
                    {value.info.title.ru}
                </span>
            </p>
            {Object.entries(value.score).map(([key, score]) => (
                <Score value={score} key={key} />
            ))}
            {/*<img src={value.image} />*/}
        </div>
    );
};
