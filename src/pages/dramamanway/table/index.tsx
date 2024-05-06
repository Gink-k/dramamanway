import React, { FC } from 'react';
import Header from './header';
import Body from './body';
import s from './styles.module.scss';

type TableProps = {};

const Table: FC<TableProps> = ({}) => {
    return (
        <div className={s.table}>
            <Header></Header>
            <Body></Body>
        </div>
    );
};

export default Table;
