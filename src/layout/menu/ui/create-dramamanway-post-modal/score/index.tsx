import { FC } from 'react';
import { Score as IScore, ScoreKey } from '../../../../../types';
import { SECTIONS_DICT } from '../../../../../constants';
import s from './styles.module.scss';
import { ScoreUnit } from './score-unit';
import { Tile } from '../../../../../ui/tile';
import { update, useDramamanwayPost, useUpdateDramamanwayPost } from '../../../lib';

export const Score: FC = () => {
    const { score } = useDramamanwayPost();
    const updateScore = useUpdateDramamanwayPost('score');
    const { description, icon } = SECTIONS_DICT.score;

    const updateScoreUnit = (key: ScoreKey, scoreUnit: IScore) => {
        updateScore((prevState) => update(prevState, key, scoreUnit));
    };

    return (
        <Tile className={s.scoreContainer} label={`${description} ${icon}`}>
            <div className={s.scoreList}>
                {Object.entries(score).map((entries) => {
                    const [key, value] = entries as [ScoreKey, IScore];

                    return (
                        <ScoreUnit
                            key={key}
                            value={value}
                            scoreKey={key}
                            updateScore={updateScoreUnit}
                        />
                    );
                })}
            </div>
        </Tile>
    );
};
