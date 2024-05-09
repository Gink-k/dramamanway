import type { DramamanwayPost, ScoreKey } from '../types';

export const KEYS = [
    'plot',
    'dialogues',
    'idea',
    'soundtrack',
    'sufficiency',
    'caste',
    'rewatchingChance',
    'cliche',
    'stupidity',
    'tightness',
    'finalScore',
] as const;

export const KEYS_DESCRIPTION: Record<ScoreKey, string> = {
    plot: 'Сюжет',
    dialogues: 'Диалоги',
    idea: 'Реализация идеи',
    soundtrack: 'Саундтрек',
    sufficiency: 'Достаточность',
    caste: 'Каст',
    rewatchingChance: 'Вероятность, что я пересмотрю',
    cliche: 'Клишированность',
    stupidity: 'Тупость',
    tightness: 'Затянутость',
    finalScore: 'Итоговая оценка',
};

export const MAX_SCORE_VALUE = 10;

export const NEGATIVE_SCORE: ScoreKey[] = ['cliche', 'stupidity', 'tightness'];

export const EMPTY_DRAMAMANWAY_POST: DramamanwayPost = {
    id: '',
    index: -1,
    image: { src: '', bgSrc: '' },
    info: {
        title: { ru: '', eng: '', original: '' },
        country: '',
        year: -1,
        episodesNumber: -1,
    },
    about: '',
    idea: '',
    feedback: '',
    negativeAspects: '',
    caste: '',
    score: KEYS.reduce(
        (acc, next) => ({ ...acc, [next]: { comment: '', value: -1 } }),
        {} as DramamanwayPost['score']
    ),
    text: '',
    recommendation: '',
    nextPostTitle: '',
};
