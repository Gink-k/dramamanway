import { FC } from 'react';
import { Tags } from './tags';
import { DramamanwayPost } from '../../../../../types';
import s from './styles.module.scss';
import { Button, CopyIcon } from '../../../../../ui';
import TooltipWrapper from '../../../../../ui/tooltip/tooltip-wrapper';
import { copyTextToClipboard, DramamanwayPostUtils } from '../../../../../lib';
import Notice from '../../../../../ui/notice';

type FooterProps = {
    onNewPost: () => void;
    dramamanwayPost: DramamanwayPost;
};

export const Footer: FC<FooterProps> = ({ dramamanwayPost, onNewPost }) => {
    const copyPostAsDefaultString = () => {
        try {
            copyTextToClipboard(
                DramamanwayPostUtils.toDefaultPostString(dramamanwayPost)
            );
            Notice.success('Пост скопирован');
        } catch (e) {
            Notice.error('Не удалось скопировать пост');
            console.error(e);
        }
    };

    return (
        <div className={s.footerContainer}>
            <Tags post={dramamanwayPost} />
            <div className={s.controlBtns}>
                <TooltipWrapper tipContent={'Новый пост'}>
                    <Button onClick={onNewPost}>New</Button>
                </TooltipWrapper>
                <TooltipWrapper
                    position={'northEast'}
                    tipContent={'Копировать'}
                >
                    <Button onClick={copyPostAsDefaultString}>
                        <CopyIcon size={18} />
                    </Button>
                </TooltipWrapper>
            </div>
        </div>
    );
};
