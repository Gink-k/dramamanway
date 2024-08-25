import { FC } from 'react';
import s from './styles.module.scss';
import { COLUMN_DESCRIPTION } from '../../../../../constants';
import { Text } from '../../../../../ui';
import TextField from '../../../../../ui/text-field';
import { Score, ScoreKey } from '../../../../../types';

type ScoreUnitProps = {
    value: Score;
    scoreKey: ScoreKey;
    updateScore: (key: ScoreKey, value: Score) => void;
};

export const ScoreUnit: FC<ScoreUnitProps> = ({ scoreKey, value, updateScore }) => {
    return (
        <Text className={s.score}>
            {COLUMN_DESCRIPTION[scoreKey]}:{' '}
            <Text className={s.scoreValue} weight={'bold'}>
                <TextField
                    className={s.textFieldAsText}
                    value={String(value.value)}
                    type={'number'}
                    onChange={(newValue) =>
                        updateScore(scoreKey, { ...value, value: Number(newValue) })
                    }
                />
                из <div>10</div>
            </Text>
        </Text>
    );
};
