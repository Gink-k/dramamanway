import React, { FC } from 'react';
import s from './styles.module.scss';
import { Row, RowProps } from './row';
import { useDramamanwayPostsScoreStats } from '../../../../hooks';

type FooterProps = {};

const toRowValue = (
    title: string,
    score: RowProps['value']['score']
): RowProps['value'] => {
    return {
        index: 0,
        info: { title: { ru: title } },
        score: score,
    } as any;
};

export const Footer: FC<FooterProps> = ({}) => {
    const { std, mode } = useDramamanwayPostsScoreStats();

    return (
        <div className={s.footer}>
            <Row value={toRowValue('Самое частое значение', mode)} />
            <Row value={toRowValue('Среднее значение', std)} />
        </div>
    );
};
