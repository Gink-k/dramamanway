import { FC, ReactNode } from 'react';
import cx from 'classnames';
import { Text } from '../text';
import s from './styles.module.scss';

type TileProps = {
    className?: string;
    label?: ReactNode;
    children: ReactNode;
};

export const Tile: FC<TileProps> = ({ label, children, className }) => {
    return (
        <div className={cx(s.tile, className)}>
            {label && (
                <Text variant={'body2'} weight={'bold'}>
                    {label}
                </Text>
            )}
            <div className={s.content}>{children}</div>
        </div>
    );
};
