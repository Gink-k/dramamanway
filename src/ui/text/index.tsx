import { FC, ReactNode } from 'react';
import s from './styles.module.scss';
import cx from 'classnames';

type TextProps = {
    children: ReactNode;
    weight?: 'normal' | 'bold';
    variant?:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'body1'
        | 'body2'
        | 'body3'
        | 'caption1'
        | 'caption2'
        | 'caption3';
    className?: string;
};

export const Text: FC<TextProps> = ({
    children,
    variant = 'body2',
    weight = 'normal',
    className,
}) => {
    return <div className={cx(s.text, s[variant], s[weight], className)}>{children}</div>;
};
