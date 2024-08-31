import { FC } from 'react';
import { LOCALES } from '../../../../../constants';
import TextField from '../../../../../ui/text-field';
import { Tile } from '../../../../../ui/tile';
import { TitleKey } from '../../../../../types';
import { update } from '../../../lib';
import s from './styles.module.scss';
import { useDramamanwayPost, useUpdateInfo } from '../../../hooks';

export const Titles: FC = () => {
    const updateInfo = useUpdateInfo();
    const dramamanwayPost = useDramamanwayPost();

    const updateTitle = (key: TitleKey, value: string) =>
        updateInfo('title', (prevState) => update(prevState, key, value));

    return (
        <Tile className={s.titles} label={'Название'}>
            <div className={s.titleContent}>
                {LOCALES.map((locale, idx) => (
                    <TextField
                        variant={'transparent'}
                        autoFocus={idx === 0}
                        key={locale}
                        placeholder={locale}
                        label={locale}
                        value={dramamanwayPost.info.title[locale]}
                        onChange={(text) => updateTitle(locale, text)}
                    />
                ))}
            </div>
        </Tile>
    );
};
