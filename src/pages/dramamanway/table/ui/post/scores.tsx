import { FC } from 'react';
import { DramamanwayPost } from '../../../../../types';
import {
    KEYS_DESCRIPTION,
    MAX_SCORE_VALUE,
    SCORE_KEYS,
} from '../../../../../constants';
import s from './styles.module.scss';

type ScoresProps = {
    post: DramamanwayPost;
};

export const Scores: FC<ScoresProps> = ({ post }) => {
    return (
        <div className={s.scores}>
            <p className={s.title}>Оценки:</p>
            {SCORE_KEYS.map((key) => (
                <p key={key} className={s.score}>
                    <span className={s.label}>{KEYS_DESCRIPTION[key]}: </span>
                    <span className={s.value}>
                        {post.score[key].value} из {MAX_SCORE_VALUE}
                    </span>
                </p>
            ))}
        </div>
    );
};
