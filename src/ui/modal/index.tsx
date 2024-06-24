import React, { FC, ReactNode } from 'react';
import s from './styles.module.scss';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import { CrossIcon } from '../icons';

type ModalProps = {
    open?: boolean;
    children: ReactNode;
    onClose?: () => void;
    size?: 'small' | 'standard' | 'large' | 'xxl';
    hasBackground?: boolean;
};

export const Modal: FC<ModalProps> = ({
    open,
    children,
    onClose,
    size = 'standard',
    hasBackground = true,
}) => {
    if (!open) {
        return null;
    }

    return createPortal(
        <div onClick={onClose} className={s.wrapper}>
            <div
                className={cx(
                    s.container,
                    s[size],
                    hasBackground && s.withBackground
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <CrossIcon
                    className={s.crossIcon}
                    size={12}
                    fill={'gray'}
                    onClick={onClose}
                />
                {children}
            </div>
        </div>,
        document.body
    );
};
