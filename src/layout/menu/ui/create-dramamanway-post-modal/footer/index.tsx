import { FC } from 'react';
import { Tags } from './tags';
import { DramamanwayPost } from '../../../../../types';
import s from './styles.module.scss';
import { Button, CopyIcon } from '../../../../../ui';
import TooltipWrapper from '../../../../../ui/tooltip/tooltip-wrapper';

type FooterProps = {
    dramamanwayPost: DramamanwayPost;
};

export const Footer: FC<FooterProps> = ({ dramamanwayPost }) => {
    return (
        <div className={s.footerContainer}>
            <Tags post={dramamanwayPost} />
            <div>
                <TooltipWrapper
                    position={'northEast'}
                    tipContent={'Копировать'}
                >
                    <Button>
                        <CopyIcon size={18} />
                    </Button>
                </TooltipWrapper>
            </div>
        </div>
    );
};
