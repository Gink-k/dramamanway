import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export interface IButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    variant?: 'primary' | 'ghost' | 'danger' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    icon?: React.ReactNode;
}

export const Button: React.FC<IButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    icon,
    size = 'medium',
    ...props
}) => {
    return (
        <button
            className={cx(styles.commonBtn, styles[variant!], styles[size!], {
                [className]: !!className,
            })}
            {...props}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {children && <div>{children}</div>}
        </button>
    );
};
