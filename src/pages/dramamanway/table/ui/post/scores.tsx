import { FC } from 'react';
import { DramamanwayPost } from '../../../../../types';
import {
    KEYS_DESCRIPTION,
    MAX_SCORE_VALUE,
    SCORE_KEYS,
} from '../../../../../constants';

type ScoresProps = {
    post: DramamanwayPost;
};

export const Scores: FC<ScoresProps> = ({ post }) => {
    return (
        <div>
            {SCORE_KEYS.map((key) => (
                <div key={key}>
                    {`${KEYS_DESCRIPTION[key]}: ${post.score[key].value} из ${MAX_SCORE_VALUE}`}
                </div>
            ))}
        </div>
    );
};
