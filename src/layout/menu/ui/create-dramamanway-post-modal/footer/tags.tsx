import { FC } from 'react';
import { DramamanwayPost } from '../../../../../types';
import { DramamanwayPostUtils } from '../../../../../lib';
import s from './styles.module.scss';

type TagsProps = {
    post: DramamanwayPost;
};

export const Tags: FC<TagsProps> = ({ post }) => {
    return (
        <div className={s.tags}>
            {DramamanwayPostUtils.getTags(post).map((tag, idx) => (
                <p key={idx + tag}>{tag}</p>
            ))}
        </div>
    );
};
