import { KEYS } from '../constants';

export type Score = { value: number; comment: string };

export type ScoreKey = (typeof KEYS)[number];

export type DramamanwayPost = {
    id: string;
    index: number;
    title: string;
    image: string;
    text: string;
    points: Record<ScoreKey, Score>;
};
