import { FC } from 'react';
import { useSectionTextFieldProps } from '../../../lib';
import { Tile } from '../../../../../ui/tile';
import s from './styles.module.scss';
import TextField from '../../../../../ui/text-field';

export const NegativeAspects: FC = () => {
    const props = useSectionTextFieldProps('negativeAspects');

    return (
        <Tile className={s.negativeAspects}>
            <TextField {...props} />
        </Tile>
    );
};
