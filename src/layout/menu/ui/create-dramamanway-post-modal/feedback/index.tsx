import { FC } from 'react';
import { useSectionTextFieldProps } from '../../../lib';
import { Tile } from '../../../../../ui/tile';
import s from './styles.module.scss';
import TextField from '../../../../../ui/text-field';

export const Feedback: FC = () => {
    const props = useSectionTextFieldProps('feedback');

    return (
        <Tile className={s.feedback}>
            <TextField {...props} />
        </Tile>
    );
};
