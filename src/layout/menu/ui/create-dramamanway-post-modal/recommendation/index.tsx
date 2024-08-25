import { FC } from 'react';
import { useSectionTextFieldProps } from '../../../lib';
import { Tile } from '../../../../../ui/tile';
import s from './styles.module.scss';
import TextField from '../../../../../ui/text-field';

export const Recommendation: FC = () => {
    const props = useSectionTextFieldProps('recommendation');

    return (
        <Tile className={s.recommendation}>
            <TextField {...props} />
        </Tile>
    );
};
