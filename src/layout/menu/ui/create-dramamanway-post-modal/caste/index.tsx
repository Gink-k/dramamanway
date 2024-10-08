import { FC } from 'react';
import s from './styles.module.scss';
import { CasteUnit } from '../../../../../types';
import { DramamanwayPostUtils } from '../../../../../lib';
import { SECTIONS_DICT } from '../../../../../constants';
import { CasteField } from './caste-field';
import { Tile } from '../../../../../ui/tile';
import { useDramamanwayPost, useUpdateDramamanwayPost } from '../../../hooks';

type CasteUnitKey = keyof CasteUnit;

export const Caste: FC = () => {
    const { description, icon } = SECTIONS_DICT.caste;
    const { caste: value } = useDramamanwayPost();
    const onChange = useUpdateDramamanwayPost('caste');

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
        <Tile className={s.casteList} label={`${description} ${icon}`}>
            <div className={s.casteHeader} onClick={addCasteUnit}>
                <p className={s.addActorBtn}>Добавить актера</p>
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
