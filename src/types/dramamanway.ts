import { KEYS } from '../constants';

export type Score = { value: number; comment: string };

export type ScoreKey = (typeof KEYS)[number];

export type DramamanwayPost = {
    id: string;
    index: number;
    image: { src: string; bgSrc: string };
    info: {
        title: Record<'ru' | 'eng' | 'original', string>;
        country: string;
        year: number;
        episodesNumber: number;
    };
    about: string;
    idea: string;
    feedback: string;
    negativeAspects: string;
    caste: string;
    score: Record<ScoreKey, Score>;
    text: string;
    recommendation: string;
    nextPostTitle: string;
};
