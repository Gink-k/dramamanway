import React, { FC } from 'react';
import { Modal } from '../../../../../ui/modal';
import { useTableClosePost, useTableOpenedPost } from '../../lib';
import s from './styles.module.scss';
import { Sections } from './sections/ui';
import { Header } from './header';
import { Scores } from './scores';

type PostModalProps = {};

export const PostModal: FC<PostModalProps> = ({}) => {
    const post = useTableOpenedPost();
    const closePost = useTableClosePost();

    if (!post) return null;

    return (
        <Modal open={!!post} size={'large'} onClose={closePost}>
            <div className={s.container}>
                <div className={s.top}>
                    <div className={s.aside}>
                        <div className={s.cover}>
                            <img src={post?.image.src} alt={'обложка'} />
                        </div>
                        <Scores post={post} />
                    </div>
                    <div className={s.infoAndFeedback}>
                        <Header post={post} />
                        <Sections post={post} />
                    </div>
                    <Sections.Navigation />
                </div>
            </div>
        </Modal>
    );
};
