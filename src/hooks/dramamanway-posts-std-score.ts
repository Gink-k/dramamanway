import { SCORE_KEYS } from '../constants';
import { Score, ScoreKey } from '../types';
import { round2 } from '../lib';
import { useDramamanwayPosts } from './page';
import { useMemo } from 'react';

type ModeKey = ScoreKey | 'country';
type Mode<Final extends boolean = true> = Final extends true
    ? Record<ModeKey, Score>
    : Record<ModeKey, number[] | string[]>;

const computeMode = (a: any[]) => {
    const counts = {} as Record<any, any>;

    a.forEach(function (e) {
        if (counts[e] === undefined) {
            counts[e] = 0;
        }
        counts[e] += 1;
    });

    return Object.entries(counts).reduce((a, v) => (v[1] < a[1] ? a : v))[0];
};

const computeStd = (sum: number, count: number) => round2(sum / count, 1);

export const useDramamanwayPostsScoreStats = () => {
    const posts = useDramamanwayPosts();

    return useMemo(() => {
        const std = {} as Record<ScoreKey, Score>;
        const count = {} as Record<ScoreKey, number>;
        const mode = {} as Mode<false> | Mode;

        mode.country = [];

        for (const next of SCORE_KEYS) {
            std[next] = { value: 0 };
            count[next] = 0;
            mode[next] = [];
        }

        posts.forEach((p, idx) => {
            if (p.info.country) {
                (mode.country as string[]).push(p.info.country);
            }
            if (idx === posts.length - 1) {
                mode.country = {
                    value: computeMode(mode.country as string[]) as any,
                };
            }

            SCORE_KEYS.forEach((key) => {
                const { value } = p.score[key];

                if (value >= 0) {
                    std[key].value += value;
                    count[key] += 1;
                    (mode[key] as number[]).push(value);
                }

                if (idx === posts.length - 1) {
                    std[key].value = computeStd(std[key].value, count[key]);
                    (mode as Mode)[key] = {
                        value: Number(computeMode(mode[key] as number[])),
                    };
                }
            });
        });

        return { std, mode: mode as Mode };
    }, [posts]);
};
