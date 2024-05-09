import React, { FC } from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import { MAX_SCORE_VALUE } from '../../../../constants';
import { Score as TScore, ScoreKey } from '../../../../types';
import s from './styles.module.scss';
import { isBestScore, isNegativeScoreKey } from '../../../../lib/score';

type ScoreProps = {
    value: TScore;
    scoreKey: ScoreKey;
};

export const Score: FC<ScoreProps> = ({ value, scoreKey }) => {
    const bestScore = isBestScore(value.value);

    return (
        <p
            className={cx(styles.score, {
                [styles.bestScore]: bestScore,
                [s.negativeCell]: isNegativeScoreKey(scoreKey),
            })}
        >
            <span className={styles.scoreValue}>
                {value.value}
                {bestScore && <span className={styles.star}>⭐</span>}
            </span>
        </p>
    );
};
