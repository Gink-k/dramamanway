import React, { FC } from 'react';
import { KEYS, KEYS_DESCRIPTION } from '../../../../constants';
import s from './styles.module.scss';

type HeaderProps = {};

export const Header: FC<HeaderProps> = ({}) => {
    return (
        <div className={s.header} onClick={console.log}>
            <div>Название</div>
            {KEYS.map((key) => (
                <div key={key}>{KEYS_DESCRIPTION[key]}</div>
            ))}
        </div>
    );
};
