import { FC, useState } from 'react';
import { Button, Modal } from '../../../ui';

export const Menu: FC = () => {
    const [createPostIsOpen, setCreatePostIsOpen] = useState(false);
    return (
        <div>
            <Button onClick={() => setCreatePostIsOpen(true)}>
                Создать пост
            </Button>
            <Modal
                open={createPostIsOpen}
                onClose={() => setCreatePostIsOpen(false)}
            >
                123
            </Modal>
        </div>
    );
};
