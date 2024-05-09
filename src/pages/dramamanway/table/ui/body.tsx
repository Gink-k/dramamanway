import React, { FC, useEffect } from 'react';
import { Row } from './row';
import s from './styles.module.scss';
import {
    useDramamanwayPosts,
    useDramamanwayPostsFetch,
    useSortedDramamanwayPosts,
} from '../../../../hooks';

type BodyProps = {};

export const Body: FC<BodyProps> = ({}) => {
    const posts = useSortedDramamanwayPosts();
    const fetch = useDramamanwayPostsFetch();

    useEffect(() => {
        fetch();
    }, []);
    console.log(posts);
    return (
        <div className={s.body}>
            {posts.map((p) => (
                <Row value={p} key={p.id} />
            ))}
        </div>
    );
};
