import { FC, useState } from 'react';
import { Button } from '../../../ui';
import { CreateModal } from './create-dramamanway-post-modal';

export const Menu: FC = () => {
    const [createPostIsOpen, setCreatePostIsOpen] = useState(false);

    return (
        <div>
            <Button size={'small'} onClick={() => setCreatePostIsOpen(true)}>
                Создать пост
            </Button>
            <CreateModal open={createPostIsOpen} onClose={() => setCreatePostIsOpen(false)} />
        </div>
    );
};
