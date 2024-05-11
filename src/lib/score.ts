import { Score, ScoreKey } from '../types';
import {
    EMPTY_SCORE_VALUE,
    MAX_SCORE_VALUE,
    NEGATIVE_SCORE,
} from '../constants';

export const isNegativeScoreKey = (scoreKey: ScoreKey) =>
    NEGATIVE_SCORE.includes(scoreKey);

export const isBestScore = (score: Score) => score.value === MAX_SCORE_VALUE;

export const isEmptyScore = (score: Score) => score.value === EMPTY_SCORE_VALUE;
