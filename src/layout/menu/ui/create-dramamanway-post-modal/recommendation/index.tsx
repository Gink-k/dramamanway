import { FC } from 'react';
import { Tile } from '../../../../../ui/tile';
import s from './styles.module.scss';
import TextField from '../../../../../ui/text-field';
import { useSectionTextFieldProps } from '../../../hooks';

export const Recommendation: FC = () => {
    const { label, ...props } = useSectionTextFieldProps('recommendation');

    return (
        <Tile className={s.recommendation} label={label}>
            <TextField {...props} />
        </Tile>
    );
};
