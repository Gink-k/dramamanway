import React, { FC, useEffect, useState } from 'react';
import Row from './row';
import { DramamanwayPost, Score, ScoreKey } from '../../../types';
import { parseDramamanwayPost, round2 } from '../../../lib';
import { KEYS } from '../../../constants';
import s from './styles.module.scss';

type BodyProps = {};

const Body: FC<BodyProps> = ({}) => {
    // const [posts, fetch] = useStore((state) => [
    //     state.dramamanwayPosts,
    //     state.fetchDramamanwayPosts,
    // ]);
    const [posts, setPosts] = useState<DramamanwayPost[]>([]);

    const fetch = async () => {
        for await (const post of parseDramamanwayPost()) {
            setPosts((allPosts) => [...allPosts, post]);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const std = KEYS.reduce(
        (acc, next) => ({ ...acc, [next]: { value: 0, comment: '' } }),
        {} as Record<ScoreKey, Score>
    );

    return (
        <div>
            {posts.map((p, idx) => {
                KEYS.forEach((key) => {
                    std[key].value += p.score[key].value;

                    if (idx === posts.length - 1) {
                        std[key].value = round2(
                            std[key].value / posts.length,
                            1
                        );
                    }
                });

                return <Row value={p} key={p.id} />;
            })}
            <Row
                value={
                    {
                        index: 0,
                        info: { title: { ru: 'Среднее значение' } },
                        score: std,
                    } as any
                }
            />
        </div>
    );
};

export default Body;
