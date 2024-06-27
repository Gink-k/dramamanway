import { FC } from 'react';
import s from './styles.module.scss';
import TextField from '../../../../ui/text-field';
import { Caste as ICaste, CasteUnit } from '../../../../types';
import { Button } from '../../../../ui';
import { DramamanwayPostUtils } from '../../../../lib';

type CasteProps = {
    value: ICaste;
    onChange: (caste: ICaste) => void;
};

export const Caste: FC<CasteProps> = ({ value, onChange }) => {
    const updateCaste = (
        idx: number,
        key: keyof CasteUnit,
        casteUnitValue: CasteUnit[keyof CasteUnit]
    ) => {
        const newCaste = [...value.units];

        newCaste[idx] = { ...newCaste[idx], [key]: casteUnitValue };
        onChange({ ...value, units: newCaste });
    };
    return (
        <div
            className={s.caste}
            style={{
                backgroundColor:
                    DramamanwayPostUtils.getSectionConfig('caste')?.color,
            }}
        >
            <div className={s.casteFields}>
                {
                    //@TODO comment
                    value.units.map((casteUnit, idx) => (
                        <div key={idx}>
                            <TextField
                                value={casteUnit.actor.ru}
                                placeholder={'ru'}
                                onChange={(ru) => {
                                    const actor = {
                                        ...casteUnit.actor,
                                        ru,
                                    };
                                    updateCaste(idx, 'actor', actor);
                                }}
                            />
                            <TextField
                                value={casteUnit.actor.eng}
                                placeholder={'eng'}
                                onChange={(eng) => {
                                    const actor = {
                                        ...casteUnit.actor,
                                        eng,
                                    };
                                    updateCaste(idx, 'actor', actor);
                                }}
                            />
                            <p> {'=>'} </p>
                            <TextField
                                value={casteUnit.character}
                                placeholder={'Персонаж'}
                                onChange={(character) =>
                                    updateCaste(idx, 'character', character)
                                }
                            />
                        </div>
                    ))
                }
            </div>
            <Button
                onClick={() =>
                    onChange({
                        ...value,
                        units: [
                            ...value.units,
                            DramamanwayPostUtils.getEmptyCasteUnit(),
                        ],
                    })
                }
            >
                Добавить актера
            </Button>
        </div>
    );
};
