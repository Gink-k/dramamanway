import React, { FC } from 'react';
import s from './styles.module.scss';
import { Header } from './header';
import { Footer } from './footer';
import { Body } from './body';
import { PostModal } from './post/post-modal';

type TableProps = {};

export const Table: FC<TableProps> = ({}) => {
    return (
        <div className={s.table}>

            <Header />
            <Body />
            <Footer />
            <PostModal />
        </div>
    );
};
