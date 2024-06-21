import { FC, ReactNode } from 'react';
import { Logo } from './logo';
import s from './styles.module.scss';

type HeaderProps = {
    children?: ReactNode;
};

export const Header: FC<HeaderProps> = ({ children }) => {
    return (
        <div className={s.head}>
            <Logo />
            {children}
        </div>
    );
};
