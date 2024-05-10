import React, { FC } from 'react';
import type { DramamanwayPost, ScoreKey } from '../../../../../types';
import s from './styles.module.scss';
import parentStyles from '../styles.module.scss';
import { isBestScore, isNegativeScoreKey } from '../../../../../lib';
import { Cell } from './cell';
import cx from 'classnames';

export type RowProps = {
    className?: string;
    value: DramamanwayPost;
};

export const Row: FC<RowProps> = ({ className, value }) => {
    return (
        <div className={cx(s.row, parentStyles.row, className)}>
            <p className={s.index}>{value.index ? `${value.index}. ` : ''}</p>
            <Cell
                className={s.title}
                best={isBestScore(value.score.finalScore.value)}
            >
                {value.info.title.ru}
            </Cell>
            {Object.entries(value.score).map(([key, score]) => (
                <Cell
                    key={key}
                    className={cx(s.score, {
                        [parentStyles.negativeCell]: isNegativeScoreKey(
                            key as ScoreKey
                        ),
                    })}
                >
                    {score.value}
                </Cell>
            ))}
        </div>
    );
};
