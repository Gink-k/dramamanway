import { FC } from 'react';
import { CreateModalContent } from './create-modal-content';
import { Modal, ModalProps } from '../../../../ui';

export const CreateModal: FC<Pick<ModalProps, 'open' | 'onClose'>> = ({
    open,
    onClose,
}) => {
    return (
        <Modal size={'xxl'} hasBackground={false} open={open} onClose={onClose}>
            <CreateModalContent />
        </Modal>
    );
};
