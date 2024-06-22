import cx from 'classnames';
import React, { FC, HTMLProps, ReactNode, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useOutsideAlerter } from '../../../hooks';

const POSITION_CLASSNAMES = {
    south: styles.S,
    north: styles.N,
    east: styles.E,
    west: styles.W,
    southEast: styles.SE,
    southWest: styles.SW,
    northEast: styles.NE,
    northWest: styles.NW,
};

export type TooltipPosition = keyof typeof POSITION_CLASSNAMES;

export type TooltipTrigger = 'hover' | 'click';

export interface TooltipWrapperProps extends HTMLProps<HTMLDivElement> {
    tipContent: ReactNode;
    position?: TooltipPosition;
    trigger?: TooltipTrigger;
    tipClassName?: string;
    onClose?: () => void;
    delay?: number;
    closeOnClick?: boolean;
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({
    position = 'north',
    tipContent,
    tipClassName,
    className,
    children,
    onClose,
    onClick,
    trigger = 'hover',
    delay = 0,
    closeOnClick = true,
    ...restProps
}) => {
    const enterTimeout = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const triggerIsClick = trigger === 'click';

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(e);

        if (triggerIsClick) {
            setIsOpen((prevState) => !prevState);
            return;
        }

        if (closeOnClick) {
            handleMouseLeave();
        }
    };

    const close = () => {
        if (!triggerIsClick) {
            return;
        }
        onClose?.();
        setIsOpen(false);
    };

    const handleMouseEnter = () => {
        enterTimeout.current = window.setTimeout(() => {
            enterTimeout.current = null;
            setIsOpen(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        if (enterTimeout.current !== null) {
            window.clearTimeout(enterTimeout.current);
        }
        setIsOpen(false);
    };

    useOutsideAlerter(close, containerRef);

    const tipClass = cx(
        styles.dropdown,
        tipClassName,
        POSITION_CLASSNAMES[position],
        {
            [styles.isOpen]: isOpen,
            [styles.hoverable]: !triggerIsClick,
        }
    );

    return (
        <div
            {...restProps}
            onClick={handleClick}
            ref={containerRef}
            className={cx(className, styles.tooltip)}
            onMouseEnter={triggerIsClick ? undefined : handleMouseEnter}
            onMouseLeave={triggerIsClick ? undefined : handleMouseLeave}
        >
            {children}
            <div
                onMouseEnter={triggerIsClick ? undefined : handleMouseLeave}
                className={tipClass}
            >
                {tipContent}
            </div>
        </div>
    );
};

export default TooltipWrapper;
