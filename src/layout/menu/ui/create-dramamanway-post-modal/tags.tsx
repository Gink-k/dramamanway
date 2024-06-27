import { FC, Fragment } from 'react';
import s from './styles.module.scss';
import { DEFAULT_TAGS } from '../../../../constants';
import { DramamanwayPost } from '../../../../types';
import { capitalize } from '../../../../lib';

const joinTitle = (title: string) => title.split(' ').map(capitalize).join('');

type TagsProps = {
    post: DramamanwayPost;
};

export const Tags: FC<TagsProps> = ({ post }) => {
    return (
        <div className={s.tags}>
            {DEFAULT_TAGS.map((tag) => (
                <p key={tag}>{tag}</p>
            ))}
            <p>{joinTitle(post.info.title.ru)}</p>
            <p>{joinTitle(post.info.title.eng)}</p>
            {post.caste.units.map((casteUnit, idx) => (
                <Fragment key={idx}>
                    <p>{joinTitle(casteUnit.actor.ru)}</p>
                    <p>{joinTitle(casteUnit.actor.eng)}</p>
                </Fragment>
            ))}
        </div>
    );
};
