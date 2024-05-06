import React, { FC } from 'react';
import { KEYS, KEYS_DESCRIPTION } from '../../../constants';
import s from './styles.module.scss';

type HeaderProps = {};

const Header: FC<HeaderProps> = ({}) => {
    return (
        <div className={s.header}>
            <div>Название</div>
            {KEYS.map((key) => (
                <div key={key}>{KEYS_DESCRIPTION[key]}</div>
            ))}
        </div>
    );
};

export default Header;
