import React, { FC, useEffect, useState } from 'react';
import { Row } from './row/row';
import s from './styles.module.scss';
import {
    useDramamanwayPostsFetch,
    useSortedDramamanwayPosts,
} from '../../../../hooks';
import cat from '../../../../assets/images/cat.gif';

type BodyProps = {};

export const Body: FC<BodyProps> = ({}) => {
    const posts = useSortedDramamanwayPosts();
    const fetch = useDramamanwayPostsFetch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch().finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (loading && posts.length !== 0) {
            setLoading(false);
        }
    }, [posts, loading]);

    if (loading) {
        return (
            <div className={s.loader}>
                <img src={cat} />
            </div>
        );
    }

    return (
        <div className={s.body}>
            {posts.map((p) => (
                <Row value={p} key={p.id} className={s.row} />
            ))}
        </div>
    );
};
