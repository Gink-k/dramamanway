import React, { HTMLProps } from 'react';
import cx from 'classnames';
import s from './styles.module.scss';

export interface ITextField {
    onChange?: (text: string) => void;
    label?: string;
    multiline?: boolean;
    value?: string;
    className?: string;
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
    invalid?: boolean;
    error?: string;
    type?: HTMLProps<HTMLInputElement>['type'];
    onClick?: React.MouseEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
    onFocus?: React.FocusEventHandler<HTMLElement>;
}

const TextField: React.ForwardRefExoticComponent<
    ITextField & React.RefAttributes<HTMLTextAreaElement | HTMLInputElement>
> = React.forwardRef<HTMLTextAreaElement | HTMLInputElement, ITextField>(
    (
        {
            label,
            value,
            className,
            multiline = false,
            invalid,
            error = 'Некорректное значение',
            onChange,
            onKeyUp,
            onKeyDown,
            onFocus,
            ...props
        },
        ref
    ) => {
        const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = (e) => {
            onKeyDown?.(e);

            if (e.key === 'Escape') {
                (e.target as HTMLElement)?.blur?.();
            }
        };
        const innerProps = {
            className: cx(s.textField, { [s.error]: invalid }),
            value,
            ...props,
        };
        const handleChange = (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => onChange?.(e.target.value);

        return (
            <div
                className={cx(s.wrapperTextField, className)}
                onKeyDown={handleKeyDown}
                onKeyUp={onKeyUp}
            >
                {label && <div className={s.label}>{label}</div>}
                {multiline ? (
                    <textarea
                        onFocus={onFocus}
                        ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
                        onChange={handleChange}
                        {...innerProps}
                    />
                ) : (
                    <input
                        onFocus={onFocus}
                        ref={ref as React.ForwardedRef<HTMLInputElement>}
                        onChange={handleChange}
                        {...innerProps}
                    />
                )}
                {invalid && <p className={s.errorMsg}>{error}</p>}
            </div>
        );
    }
);

export default TextField;
