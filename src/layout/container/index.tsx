import { FC, ReactNode } from 'react';
import s from './styles.module.scss';

type ContainerProps = {
    children: ReactNode;
};

export const Container: FC<ContainerProps> = ({ children }) => {
    return <div className={s.app}>{children}</div>;
};
