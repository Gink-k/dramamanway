import { FC } from 'react';
import TextField from '../../../../../ui/text-field';
import { CasteUnit } from '../../../../../types';
import { Button, TrashIcon } from '../../../../../ui';
import s from './styles.module.scss';

export type CasteFieldProps = {
    value: CasteUnit;
    onChange: (key: keyof CasteUnit, casteUnitValue: CasteUnit[keyof CasteUnit]) => void;
    onDelete: () => void;
};

const ACTOR_REGEX = /(?<ru>.+)\s*\((?<eng>.+)\)/;

export const CasteField: FC<CasteFieldProps> = ({ value, onChange, onDelete }) => {
    let strValue = value.actor.ru;

    if (value.actor.eng) {
        strValue = `${strValue} (${value.actor.eng})`;
    }

    return (
        <div className={s.caste}>
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
            <Button
                size={'small'}
                onClick={onDelete}
                variant={'ghost'}
                icon={<TrashIcon stroke={'#2e2e2e'} size={18} />}
            />
        </div>
    );
};
