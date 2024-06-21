import React, { FC } from 'react';
import { CatLogo } from '../../../ui';
import s from './styles.module.scss';

export const Logo: FC = () => {
    return (
        <p className={s.logo}>
            <CatLogo className={s.icon} size={64} fill={'orange'} />
            По пути дорамщика
        </p>
    );
};
