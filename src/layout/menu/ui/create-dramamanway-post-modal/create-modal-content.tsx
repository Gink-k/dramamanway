import { FC, SetStateAction, useState } from 'react';
import { DramamanwayPostUtils } from '../../../../lib';
import TextField from '../../../../ui/text-field';
import {
    DramamanwayPost,
    DramamanwayPostInfo,
    TitleKey,
} from '../../../../types';
import { LOCALES } from '../../../../constants';
import { usePersistDramamanwayPost } from '../../../../hooks';
import s from './styles.module.scss';
import { Caste } from './caste';
import { Tags } from './tags';

type CreateModalContentProps = {};

const update = <T, K extends keyof T>(
    obj: T,
    key: K,
    value: SetStateAction<T[K]>
): T => ({
    ...obj,
    [key]: typeof value === 'function' ? (value as Function)(obj[key]) : value,
});

export const CreateModalContent: FC<CreateModalContentProps> = ({}) => {
    const [dramamanwayPost, setDramamanwayPost] = useState(() =>
        DramamanwayPostUtils.getFromStorage()
    );
    usePersistDramamanwayPost(dramamanwayPost);

    const updateDramamanwayPost = <T extends keyof DramamanwayPost>(
        key: T,
        value: SetStateAction<DramamanwayPost[T]>
    ) => setDramamanwayPost((post) => update(post, key, value));

    const updateInfo = <T extends keyof DramamanwayPostInfo>(
        key: T,
        value: SetStateAction<DramamanwayPostInfo[T]>
    ) =>
        updateDramamanwayPost('info', (prevState) =>
            update(prevState, key, value)
        );

    const updateTitle = (key: TitleKey, value: string) =>
        updateInfo('title', (prevState) => update(prevState, key, value));

    return (
        <div className={s.createModalContainer}>
            <div className={s.titles}>
                {LOCALES.map((locale, idx) => (
                    <TextField
                        autoFocus={idx === 0}
                        key={locale}
                        placeholder={locale}
                        label={`Название (${locale})`}
                        value={dramamanwayPost.info.title[locale]}
                        onChange={(text) => updateTitle(locale, text)}
                    />
                ))}
            </div>
            <div className={s.main}>
                <div className={s.aside}>
                    <Caste
                        value={dramamanwayPost.caste}
                        onChange={(caste) =>
                            updateDramamanwayPost('caste', caste)
                        }
                    />
                </div>
                <div className={s.sections}>
                    <TextField
                        multiline={true}
                        value={dramamanwayPost.feedback}
                    />
                    <TextField
                        multiline={true}
                        value={dramamanwayPost.negativeAspects}
                    />
                    <Tags post={dramamanwayPost} />
                </div>
            </div>
        </div>
    );
};
