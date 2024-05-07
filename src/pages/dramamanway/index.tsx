import React, { FC } from 'react';
import Table from './table';
import s from './styles.module.scss';
const Dramamanway: FC = () => {
    return (
        <div className={s.page}>
            <Table />
        </div>
    );
};

export default Dramamanway;
