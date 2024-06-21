import React, { FC } from 'react';
import s from './styles.module.scss';
import { DramamanwayPost } from '../../../../../types';

type HeaderProps = {
    post: DramamanwayPost;
};

export const Header: FC<HeaderProps> = ({ post }) => {
    return (
        <div className={s.header}>
            <p className={s.title}>
                <span title={post.info.title.ru}>{post.info.title.ru}</span>
                <span title={post.info.title.eng}>{post.info.title.eng}</span>
                <span title={post.info.title.original}>
                    {post.info.title.original}
                </span>
            </p>
        </div>
    );
};
