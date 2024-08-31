import { FC } from 'react';
import { Tile } from '../../../../../ui/tile';
import s from './styles.module.scss';
import TextField from '../../../../../ui/text-field';
import { useSectionTextFieldProps } from '../../../hooks';

export const Feedback: FC = () => {
    const props = useSectionTextFieldProps('feedback');

    return (
        <Tile className={s.feedback}>
            <TextField {...props} />
        </Tile>
    );
};
