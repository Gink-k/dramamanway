import { FC } from 'react';
import s from '../styles.module.scss';
import { LOCALES } from '../../../../../constants';
import TextField from '../../../../../ui/text-field';
import { Tile } from '../../../../../ui/tile';
import { TitleKey } from '../../../../../types';
import { update, useDramamanwayPost, useUpdateInfo } from '../../../lib';

export const Header: FC = () => {
    const updateInfo = useUpdateInfo();
    const dramamanwayPost = useDramamanwayPost();

    const updateTitle = (key: TitleKey, value: string) =>
        updateInfo('title', (prevState) => update(prevState, key, value));

    return (
        <Tile className={s.titles}>
            {LOCALES.map((locale, idx) => (
                <TextField
                    variant={'transparent'}
                    autoFocus={idx === 0}
                    key={locale}
                    placeholder={locale}
                    label={`Название (${locale})`}
                    value={dramamanwayPost.info.title[locale]}
                    onChange={(text) => updateTitle(locale, text)}
                />
            ))}
        </Tile>
    );
};
