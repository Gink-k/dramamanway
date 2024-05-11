import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type CellProps = {
    best?: boolean;
    className?: string;
    children?: ReactNode;
};

export const Cell: FC<CellProps> = ({ className, children, best = false }) => {
    return (
        <div
            className={cx(className, {
                [styles.bestScore]: best,
            })}
        >
            <div className={styles.cellInner}>
                {children}
                {best && <div className={styles.star}>⭐</div>}
            </div>
        </div>
    );
};
