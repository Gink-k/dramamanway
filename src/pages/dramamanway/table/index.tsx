import React, { FC } from 'react';
import { parseDramamanwayPost } from '../../../lib';
import Row from './row';
import Header from './header';
import Body from './body';

type TableProps = {};

const Table: FC<TableProps> = ({}) => {
    return (
        <div>
            <Header></Header>
            <Body></Body>
        </div>
    );
};

export default Table;
