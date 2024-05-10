import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import styles from '../styles.module.scss';

type CellProps = {
    best?: boolean;
    className?: string;
    children?: ReactNode;
};

export const Cell: FC<CellProps> = ({ className, children, best = false }) => {
    return (
        <p
            className={cx(className, {
                [styles.bestScore]: best,
            })}
        >
            <span>
                {children}
                {best && <span className={styles.star}>⭐</span>}
            </span>
        </p>
    );
};
