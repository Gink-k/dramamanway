import React, { FC } from 'react';
import Header from './header';
import Body from './body';
import s from './styles.module.scss';
import Footer from './footer';

type TableProps = {};

const Table: FC<TableProps> = ({}) => {
    return (
        <div className={s.table}>
            <Header />
            <Body />
            <Footer />
        </div>
    );
};

export default Table;
