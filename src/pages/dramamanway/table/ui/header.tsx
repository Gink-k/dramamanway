import React, { FC } from 'react';
import { KEYS, KEYS_DESCRIPTION } from '../../../../constants';
import s from './styles.module.scss';
import {
    TableSort,
    TableStoreState,
    useTableSetSort,
    useTableSort,
    useTableToggleSort,
} from '../lib';
import { ScoreKey } from '../../../../types';

type HeaderProps = {};

export const Header: FC<HeaderProps> = ({}) => {
    const sort = useTableSort();
    const toggleSort = useTableToggleSort();
    const handleClick = (by: TableSort['by']) => {
        toggleSort(by);
    };

    return (
        <div className={s.header}>
            <div onClick={() => handleClick('index')}>
                Название {sort.by === 'index' && sort.order}
            </div>
            {KEYS.map((key) => (
                <div key={key} onClick={() => handleClick(key)}>
                    {KEYS_DESCRIPTION[key]} {sort.by === key && sort.order}
                </div>
            ))}
        </div>
    );
};
