import { FC, SetStateAction, useEffect, useState } from 'react';
import { capitalize, DramamanwayPostUtils } from '../../../lib';
import TextField from '../../../ui/text-field';
import { DramamanwayPost, DramamanwayPostInfo, TitleKey } from '../../../types';
import { DEFAULT_TAGS, LOCALES, SECTIONS } from '../../../constants';
import s from './styles.module.scss';

type CreateModalContentProps = {};

const LOCALSTORAGE_KEY = 'new-dramamanway-post';

const getPostFromLocalStorage = () => {
    let post: DramamanwayPost | null = null;

    try {
        post = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '');
    } catch (_) {}

    return post ?? DramamanwayPostUtils.getEmpty();
};

const update = <T, K extends keyof T>(
    obj: T,
    key: K,
    value: SetStateAction<T[K]>
): T => ({
    ...obj,
    [key]: typeof value === 'function' ? (value as Function)(obj[key]) : value,
});

const joinTitle = (title: string) => title.split(' ').map(capitalize).join('');

export const CreateModalContent: FC<CreateModalContentProps> = ({}) => {
    const [dramamanwayPost, setDramamanwayPost] = useState(() =>
        getPostFromLocalStorage()
    );

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

    useEffect(
        () =>
            localStorage.setItem(
                LOCALSTORAGE_KEY,
                JSON.stringify(dramamanwayPost)
            ),
        [dramamanwayPost]
    );

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
            <div className={s.sections}>
                {SECTIONS.map(({ key, description, icon }) => (
                    <TextField
                        key={key}
                        label={`${description} ${icon}`}
                        value={dramamanwayPost[key]}
                        className={s[key]}
                        multiline={true}
                        placeholder={'Введи текст...'}
                        onChange={(value) => updateDramamanwayPost(key, value)}
                    />
                ))}
                <div className={s.tags}>
                    {DEFAULT_TAGS.map((tag) => (
                        <p key={tag}>{tag}</p>
                    ))}
                    <p>{joinTitle(dramamanwayPost.info.title.ru)}</p>
                    <p>{joinTitle(dramamanwayPost.info.title.eng)}</p>
                </div>
            </div>
        </div>
    );
};
