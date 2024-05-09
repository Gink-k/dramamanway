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
        const count = KEYS.reduce(
            (acc, next) => ({ ...acc, [next]: 0 }),
            {} as Record<ScoreKey, number>
        );

        posts.forEach((p, idx) => {
            KEYS.forEach((key) => {
                const { value } = p.score[key];

                if (value >= 0) {
                    std[key].value += value;
                    count[key] += 1;
                }

                if (idx === posts.length - 1) {
                    std[key].value = round2(std[key].value / count[key], 1);
                }
            });
        });
        return std;
    }, [posts]);
};
