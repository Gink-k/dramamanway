import React, { FC } from 'react';
import {
    SCORE_KEYS,
    KEYS_DESCRIPTION,
    COLUMN_KEYS,
} from '../../../../constants';
import s from './styles.module.scss';
import { TableSort, useTableSort, useTableToggleSort } from '../lib';
import cx from 'classnames';
import { isNegativeScoreKey } from '../../../../lib';
import { ScoreKey } from '../../../../types';
import { TriangleIcons } from '../../../../ui/icons';

type HeaderProps = {};

export const Header: FC<HeaderProps> = ({}) => {
    const sort = useTableSort();
    const toggleSort = useTableToggleSort();
    const handleClick = (by: TableSort['by']) => {
        toggleSort(by);
    };

    return (
        <div className={s.header}>
            {COLUMN_KEYS.map((key) => (
                <div
                    key={key}
                    onClick={() => handleClick(key)}
                    className={cx({
                        [s.negativeCell]: isNegativeScoreKey(key as ScoreKey),
                    })}
                >
                    {KEYS_DESCRIPTION[key]}{' '}
                    {sort.by === key && (
                        <TriangleIcons
                            className={cx(s.sort, s[sort.order])}
                            size={16}
                            fill={'#92C7CF'}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};
