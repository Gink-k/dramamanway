import { COLUMN_KEYS, SCORE_KEYS } from '../constants';

export type Score = { value: number; comment?: string };

export type ScoreKey = (typeof SCORE_KEYS)[number];

export type ColumnKey = (typeof COLUMN_KEYS)[number];

export type TitleKey = 'ru' | 'eng' | 'original';

export type DramamanwayPostInfo = {
    title: Record<TitleKey, string>;
    country: string;
    year: number;
    episodesNumber: number;
};

export type CasteUnit = {
    actor: { ru: string; eng: string };
    character: string;
    comment: string;
};

export type Caste = {
    units: CasteUnit[];
    raw: string;
};

export type DramamanwayPost = {
    id: string;
    index: number;
    image: { src: string; bgSrc: string };
    info: DramamanwayPostInfo;
    about: string;
    idea: string;
    feedback: string;
    negativeAspects: string;
    caste: Caste;
    score: Record<ScoreKey, Score>;
    text: string;
    recommendation: string;
    nextPostTitle: string;
};
export type DramamanwayPostKey = keyof DramamanwayPost;
