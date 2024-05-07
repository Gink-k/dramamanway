import { KEYS } from '../constants';
import { Score, ScoreKey } from '../types';
import { round2 } from '../lib';
import { useDramamanwayPosts } from './page';
import { useMemo } from 'react';

export const useDramamanwayPostsStdScore = () => {
    const posts = useDramamanwayPosts();

    return useMemo(() => {
        const std = KEYS.reduce(
            (acc, next) => ({ ...acc, [next]: { value: 0, comment: '' } }),
            {} as Record<ScoreKey, Score>
        );

        posts.forEach((p, idx) => {
            KEYS.forEach((key) => {
                std[key].value += p.score[key].value;

                if (idx === posts.length - 1) {
                    std[key].value = round2(std[key].value / posts.length, 1);
                }
            });
        });
        return std;
    }, [posts]);
};
