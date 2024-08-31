import { FC } from 'react';
import { Tile } from '../../../../../ui/tile';
import s from './styles.module.scss';
import TextField from '../../../../../ui/text-field';
import { useSectionTextFieldProps } from '../../../hooks';

export const NegativeAspects: FC = () => {
    const props = useSectionTextFieldProps('negativeAspects');

    return (
        <Tile className={s.negativeAspects}>
            <TextField {...props} />
        </Tile>
    );
};
