import React, { FC } from 'react';
import { Modal } from '../../../../ui/modal';
import { useTableClosePost, useTableOpenedPost } from '../lib';

type PostModalProps = {};

export const PostModal: FC<PostModalProps> = ({}) => {
    const post = useTableOpenedPost();
    const closePost = useTableClosePost();

    return (
        <Modal open={!!post} size={'large'} onClose={closePost}>
            {post?.info.title.ru}
        </Modal>
    );
};
