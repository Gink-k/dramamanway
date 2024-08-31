import { FC } from 'react';
import { Tile } from '../../../../../ui/tile';
import s from './styles.module.scss';
import TextField from '../../../../../ui/text-field';
import { useSectionTextFieldProps } from '../../../hooks';

export const About: FC = () => {
    const { label, ...props } = useSectionTextFieldProps('about');

    return (
        <Tile className={s.about} label={label}>
            <TextField {...props} />
        </Tile>
    );
};
