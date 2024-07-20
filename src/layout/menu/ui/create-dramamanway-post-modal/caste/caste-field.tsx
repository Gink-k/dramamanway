import { FC } from 'react';
import TextField from '../../../../../ui/text-field';
import { CasteUnit } from '../../../../../types';

export type CasteFieldProps = {
    value: CasteUnit;
    onChange: (
        key: keyof CasteUnit,
        casteUnitValue: CasteUnit[keyof CasteUnit]
    ) => void;
};

export const CasteField: FC<CasteFieldProps> = ({ value, onChange }) => {
    return (
        <div>
            <TextField
                value={value.actor.ru}
                placeholder={'ru'}
                onChange={(ru) => {
                    const actor = {
                        ...value.actor,
                        ru,
                    };
                    onChange('actor', actor);
                }}
            />
            <TextField
                value={value.actor.eng}
                placeholder={'eng'}
                onChange={(eng) => {
                    const actor = {
                        ...value.actor,
                        eng,
                    };
                    onChange('actor', actor);
                }}
            />
            <p> {'=>'} </p>
            <TextField
                value={value.character}
                placeholder={'Персонаж'}
                onChange={(character) => onChange('character', character)}
            />
        </div>
    );
};
