import { FC } from 'react';
import { useSectionTextFieldProps } from '../../../lib';
import { Tile } from '../../../../../ui/tile';
import s from './styles.module.scss';
import TextField from '../../../../../ui/text-field';

export const Idea: FC = () => {
    const props = useSectionTextFieldProps('idea');

    return (
        <Tile className={s.idea}>
            <TextField {...props} />
        </Tile>
    );
};
