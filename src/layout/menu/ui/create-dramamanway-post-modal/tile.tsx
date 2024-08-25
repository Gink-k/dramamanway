import { FC, ReactNode } from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import { Text } from '../../../../ui';

type TileProps = {
    className?: string;
    label?: ReactNode;
    children: ReactNode;
};

export const Tile: FC<TileProps> = ({ label, children, className }) => {
    return (
        <div className={cx(s.tile, className)}>
            {label && <Text>{label}</Text>}
            {children}
        </div>
    );
};
