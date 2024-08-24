import { FC } from 'react';
import TextField from '../../../../../ui/text-field';
import { CasteUnit } from '../../../../../types';
import { Button } from '../../../../../ui';

export type CasteFieldProps = {
    value: CasteUnit;
    onChange: (
        key: keyof CasteUnit,
        casteUnitValue: CasteUnit[keyof CasteUnit]
    ) => void;
    onDelete: () => void;
};

const ACTOR_REGEX = /(?<ru>.+)\s*\((?<eng>.+)\)/;

export const CasteField: FC<CasteFieldProps> = ({
    value,
    onChange,
    onDelete,
}) => {
    let strValue = value.actor.ru;

    if (value.actor.eng) {
        strValue = `${strValue} (${value.actor.eng})`;
    }

    return (
        <div>
            <TextField
                value={strValue}
                placeholder={'Актер'}
                onChange={(ruEng) => {
                    const { ru = ruEng, eng = '' } =
                        ruEng.match(ACTOR_REGEX)?.groups || {};

                    const actor = {
                        ...value.actor,
                        ru,
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
            <Button onClick={onDelete}>Удалить</Button>
        </div>
    );
};
