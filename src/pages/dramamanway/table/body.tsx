import React, { FC, useEffect } from 'react';
import Row from './row';
import s from './styles.module.scss';
import { useDramamanwayPosts, useDramamanwayPostsFetch } from '../../../hooks';

type BodyProps = {};

const Body: FC<BodyProps> = ({}) => {
    const posts = useDramamanwayPosts();
    const fetch = useDramamanwayPostsFetch();

    useEffect(() => {
        fetch();
    }, []);
    return (
        <div className={s.body}>
            {posts.map((p, idx) => (
                <Row value={p} key={p.id} />
            ))}
        </div>
    );
};

export default Body;
