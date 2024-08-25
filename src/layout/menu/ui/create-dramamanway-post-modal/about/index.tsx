import { FC } from 'react';
import { useSectionTextFieldProps } from '../../../lib';
import { Tile } from '../../../../../ui/tile';
import s from './styles.module.scss';
import TextField from '../../../../../ui/text-field';

export const About: FC = () => {
    const props = useSectionTextFieldProps('about');

    return (
        <Tile className={s.about}>
            <TextField {...props} />
        </Tile>
    );
};
