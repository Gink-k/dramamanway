import React, { FC } from 'react';
import type { DramamanwayPost, ScoreKey } from '../../../../../types';
import s from './styles.module.scss';
import parentStyles from '../styles.module.scss';
import {
    isBestScore,
    isEmptyScore,
    isNegativeScoreKey,
} from '../../../../../lib';
import { Cell } from './cell';
import cx from 'classnames';

export type RowProps = {
    className?: string;
    value: DramamanwayPost;
};

export const Row: FC<RowProps> = ({ className, value }) => {
    return (
        <div className={cx(s.row, parentStyles.row, className)}>
            <Cell className={s.index}>
                {value.image && (
                    <div
                        className={s.cover}
                        // style={{ backgroundImage: `url(${value.image.bgSrc})` }}
                    >
                        <img src={value.image.src} />
                    </div>
                )}
                {value.index ? `${value.index}. ` : ''}
            </Cell>
            <Cell
                className={s.title}
                best={isBestScore(value.score.finalScore)}
            >
                {value.info.title.ru}
            </Cell>
            <Cell>{value.info.country || '-'}</Cell>
            {Object.entries(value.score).map(([key, score]) => (
                <Cell
                    key={key}
                    best={isBestScore(score)}
                    className={cx(s.score, {
                        [parentStyles.negativeCell]: isNegativeScoreKey(
                            key as ScoreKey
                        ),
                    })}
                >
                    {isEmptyScore(score) ? -1 : score.value}
                </Cell>
            ))}
        </div>
    );
};
