import { FC, useState } from 'react';
import { Button, Modal } from '../../../ui';
import { CreateModalContent } from './create-modal-content';

export const Menu: FC = () => {
    const [createPostIsOpen, setCreatePostIsOpen] = useState(true);
    return (
        <div>
            <Button onClick={() => setCreatePostIsOpen(true)}>
                Создать пост
            </Button>
            <Modal
                size={'xxl'}
                hasBackground={false}
                open={createPostIsOpen}
                onClose={() => setCreatePostIsOpen(false)}
            >
                <CreateModalContent />
            </Modal>
        </div>
    );
};
