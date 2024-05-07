import type { ScoreKey } from '../types';

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
