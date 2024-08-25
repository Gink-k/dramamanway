import { FC } from 'react';
import { DramamanwayPost, Score as IScore, ScoreKey } from '../../../../../types';
import { COLUMN_DESCRIPTION, SECTIONS_DICT } from '../../../../../constants';
import TextField from '../../../../../ui/text-field';
import s from './styles.module.scss';
import { Text } from '../../../../../ui';

type ScoresProps = {
    score: DramamanwayPost['score'];
    onChange: (score: DramamanwayPost['score']) => void;
};

export const Score: FC<ScoresProps> = ({ score, onChange }) => {
    const { description, icon } = SECTIONS_DICT.score;
    const updateScore = <T extends keyof Required<IScore>>(
        key: ScoreKey,
        scoreUnitKey: T,
        scoreUnit: IScore[T]
    ) => {
        const newScoreUnit = { ...score[key] };

        newScoreUnit[scoreUnitKey] = scoreUnit;
        onChange({ ...score, [key]: newScoreUnit });
    };
    return (
        <div>
            <p className={s.label}>
                {description} {icon}
            </p>
            <div className={s.scoreList}>
                {Object.entries(score).map((entries) => {
                    const [key, value] = entries as [ScoreKey, IScore];

                    return (
                        <Text className={s.score} key={key}>
                            {COLUMN_DESCRIPTION[key]}:{' '}
                            <Text className={s.scoreValue} weight={'bold'}>
                                <TextField
                                    className={s.textFieldAsText}
                                    value={String(value.value)}
                                    type={'number'}
                                    onChange={(newValue) =>
                                        updateScore(key, 'value', Number(newValue))
                                    }
                                />
                                из <div>10</div>
                            </Text>
                        </Text>
                    );
                })}
            </div>
        </div>
    );
};
