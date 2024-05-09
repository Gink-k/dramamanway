import React, { FC } from 'react';
import type { DramamanwayPost, ScoreKey } from '../../../../types';
import styles from './styles.module.scss';
import { Score } from './score';
import cx from 'classnames';
import { MAX_SCORE_VALUE } from '../../../../constants';
import { isBestScore } from '../../../../lib';

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
                        [styles.bestScore]: isBestScore(
                            value.score.finalScore.value
                        ),
                    })}
                >
                    {value.info.title.ru}
                </span>
            </p>
            {Object.entries(value.score).map(([key, score]) => (
                <Score value={score} scoreKey={key as ScoreKey} key={key} />
            ))}
            {/*<img src={value.image} />*/}
        </div>
    );
};
