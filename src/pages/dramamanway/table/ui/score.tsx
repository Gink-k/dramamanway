import React, { FC } from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import { MAX_SCORE_VALUE } from '../../../../constants';
import { Score as TScore } from '../../../../types';

type ScoreProps = {
    value: TScore;
};

export const Score: FC<ScoreProps> = ({ value }) => {
    const bestScore = value.value === MAX_SCORE_VALUE;

    return (
        <p
            className={cx(styles.score, {
                [styles.bestScore]: bestScore,
            })}
        >
            <span className={styles.scoreValue}>
                {value.value}
                {bestScore && <span className={styles.star}>⭐</span>}
            </span>
        </p>
    );
};
