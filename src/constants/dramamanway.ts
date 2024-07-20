import type { CasteUnit, ColumnKey, DramamanwayPost, ScoreKey } from '../types';

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

export const COLUMN_DESCRIPTION: Record<ColumnKey, string> = {
    index: '#',
    title: 'Название',
    county: 'Страна',
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

export const EMPTY_CAST_UNIT: CasteUnit = {
    actor: { ru: '', eng: '' },
    character: '',
    comment: '',
};

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
    caste: { units: [], raw: '' },
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

export const SECTIONS_DICT = {
    about: { description: 'О чём?', icon: '💬', color: '' },
    idea: { description: 'Идея', icon: '✨', color: '' },
    feedback: { description: 'Впечатления', icon: '🙀', color: '' },
    negativeAspects: {
        description: 'Что не понравилось?',
        icon: '🚫',
        color: '',
    },
    caste: { description: 'Каст', icon: '👫', color: '' },
    score: { description: 'Оценки', icon: '💯', color: '' },
    recommendation: {
        description: 'Рекомендация к просмотру',
        icon: '📺',
        color: '',
    },
} as const;

type SectionDict = typeof SECTIONS_DICT;
type SectionKey = keyof SectionDict;
type SectionInfo = SectionDict[SectionKey] & { key: SectionKey };

export const SECTIONS = Object.entries(SECTIONS_DICT).reduce(
    (acc, [key, value]) => [...acc, { key: key as SectionKey, ...value }],
    [] as SectionInfo[]
);

export const DEFAULT_TAGS = ['dramamanway', 'drama', 'дорама'];
