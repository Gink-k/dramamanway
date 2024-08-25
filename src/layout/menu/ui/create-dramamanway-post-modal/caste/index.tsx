import { FC } from 'react';
import s from './styles.module.scss';
import { Caste as ICaste, CasteUnit } from '../../../../../types';
import { DramamanwayPostUtils } from '../../../../../lib';
import { SECTIONS_DICT } from '../../../../../constants';
import { CasteField } from './caste-field';
import { Tile } from '../tile';

type CasteProps = {
    value: ICaste;
    onChange: (caste: ICaste) => void;
};

type CasteUnitKey = keyof CasteUnit;

export const Caste: FC<CasteProps> = ({ value, onChange }) => {
    const { description, icon } = SECTIONS_DICT.caste;

    const updateCaste = (
        idx: number,
        key: CasteUnitKey,
        casteUnitValue: CasteUnit[CasteUnitKey]
    ) => {
        const newCaste = [...value.units];

        newCaste[idx] = { ...newCaste[idx], [key]: casteUnitValue };
        onChange({ ...value, units: newCaste });
    };
    const addCasteUnit = () =>
        onChange({
            ...value,
            units: [...value.units, DramamanwayPostUtils.getEmptyCasteUnit()],
        });

    const deleteCasteUnit = (idx: number) => {
        const newValueUnits = [...value.units];

        newValueUnits.splice(idx, 1);
        onChange({ ...value, units: newValueUnits });
    };

    return (
        <Tile className={s.casteList}>
            <div className={s.casteHeader}>
                <p className={s.label}>
                    {description} {icon}
                </p>
                <p className={s.addActorBtn} onClick={addCasteUnit}>
                    Добавить актера
                </p>
            </div>
            <div className={s.casteFields}>
                {
                    //@TODO comment
                    value.units.map((casteUnit, idx) => (
                        <CasteField
                            key={idx}
                            value={casteUnit}
                            onChange={updateCaste.bind(null, idx)}
                            onDelete={deleteCasteUnit.bind(null, idx)}
                        />
                    ))
                }
            </div>
        </Tile>
    );
};
