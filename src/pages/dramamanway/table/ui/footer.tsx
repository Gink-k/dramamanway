import React, { FC } from 'react';
import s from './styles.module.scss';
import { Row } from './row';
import { useDramamanwayPostsStdScore } from '../../../../hooks';

type FooterProps = {};

export const Footer: FC<FooterProps> = ({}) => {
    const std = useDramamanwayPostsStdScore();

    return (
        <div className={s.footer}>
            <Row
                value={
                    {
                        index: 0,
                        info: { title: { ru: 'Среднее значение' } },
                        score: std,
                    } as any
                }
            />
        </div>
    );
};
