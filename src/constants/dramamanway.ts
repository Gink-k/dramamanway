import type { ColumnKey, DramamanwayPost, ScoreKey } from '../types';

export const SCORE_KEYS = [
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

export const COLUMN_KEYS = ['index', 'title', 'county', ...SCORE_KEYS] as const;

export const KEYS_DESCRIPTION: Record<ColumnKey, string> = {
    index: '#',
    title: 'Название',
    county: 'Срана',
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

export const EMPTY_SCORE_VALUE = -1;

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
    score: SCORE_KEYS.reduce(
        (acc, next) => ({
            ...acc,
            [next]: { comment: '', value: EMPTY_SCORE_VALUE },
        }),
        {} as DramamanwayPost['score']
    ),
    text: '',
    recommendation: '',
    nextPostTitle: '',
};

export const LOCALES = ['ru', 'eng', 'original'] as const;

export const SECTIONS = [
    { key: 'about', description: 'О чём?', icon: '💬', color: '' },
    { key: 'idea', description: 'Идея', icon: '✨', color: '' },
    { key: 'feedback', description: 'Впечатления', icon: '🙀', color: '' },
    {
        key: 'negativeAspects',
        description: 'Что не понравилось?',
        icon: '🚫',
        color: '',
    },
    { key: 'caste', description: 'Каст', icon: '👫', color: '' },
    {
        key: 'recommendation',
        description: 'Рекомендация к просмотру',
        icon: '📺',
        color: '',
    },
] as const;

export const DEFAULT_TAGS = ['dramamanway', 'drama', 'дорама'];
