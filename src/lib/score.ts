import { Score, ScoreKey } from '../types';
import { MAX_SCORE_VALUE, NEGATIVE_SCORE } from '../constants';

export const isNegativeScoreKey = (scoreKey: ScoreKey) =>
    NEGATIVE_SCORE.includes(scoreKey);

export const isBestScore = (score: Score['value']) => score === MAX_SCORE_VALUE;
