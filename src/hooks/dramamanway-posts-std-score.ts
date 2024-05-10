import { MAX_SCORE_VALUE, SCORE_KEYS } from '../constants';
import { Score, ScoreKey } from '../types';
import { round2 } from '../lib';
import { useDramamanwayPosts } from './page';
import { useMemo } from 'react';

export const useDramamanwayPostsScoreStats = () => {
    const posts = useDramamanwayPosts();

    return useMemo(() => {
        const std = {} as Record<ScoreKey, Score>;
        const count = {} as Record<ScoreKey, number>;
        const mode = {} as Record<ScoreKey, number[] | Score>;

        for (const next of SCORE_KEYS) {
            std[next] = { value: 0, comment: '' };
            count[next] = 0;
            mode[next] = new Array(MAX_SCORE_VALUE + 1).fill(0);
        }

        posts.forEach((p, idx) => {
            SCORE_KEYS.forEach((key) => {
                const { value } = p.score[key];

                if (value >= 0) {
                    std[key].value += value;
                    count[key] += 1;
                    (mode[key] as number[])[value] += 1;
                }

                if (idx === posts.length - 1) {
                    const modeValue = (mode[key] as number[]).reduce(
                        (curr, next, idx) =>
                            curr[0] > next ? curr : [next, idx],
                        [0, 0]
                    )[1];

                    std[key].value = round2(std[key].value / count[key], 1);
                    mode[key] = { value: modeValue };
                }
            });
        });
        return { std, mode: mode as Record<ScoreKey, Score> };
    }, [posts]);
};
