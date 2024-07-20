import { FC, SetStateAction, useState } from 'react';
import { DramamanwayPostUtils } from '../../../../lib';
import TextField from '../../../../ui/text-field';
import {
    DramamanwayPost,
    DramamanwayPostInfo,
    DramamanwayPostKey,
    TitleKey,
} from '../../../../types';
import { LOCALES, SECTIONS_DICT } from '../../../../constants';
import { usePersistDramamanwayPost } from '../../../../hooks';
import s from './styles.module.scss';
import { Caste } from './caste';
import { Score } from './score';
import { Footer } from './footer';
import cx from 'classnames';

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

    const updateDramamanwayPost = <T extends DramamanwayPostKey>(
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

    const getStandardProps = (key: keyof typeof SECTIONS_DICT) => {
        const { description, icon } = SECTIONS_DICT[key];

        return {
            label: `${description} ${icon}`,
            multiline: true,
            value: dramamanwayPost[key] as string,
            onChange: (val: string) => updateDramamanwayPost(key, val),
            placeholder: 'Введи что-нибудь...',
            className: s.textField,
        } as const;
    };

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
                <div className={s.horizontalContainer}>
                    <div className={cx(s.sections, s.aside)}>
                        <div>
                            <div className={s.restInfo}>
                                <TextField
                                    type={'number'}
                                    placeholder={'Введи индекс'}
                                    label={`Индекс`}
                                    value={dramamanwayPost.index.toString()}
                                    onChange={(text) =>
                                        updateDramamanwayPost(
                                            'index',
                                            Number(text)
                                        )
                                    }
                                />
                                <TextField
                                    placeholder={'Введи страну'}
                                    label={`Страна`}
                                    value={dramamanwayPost.info.country}
                                    onChange={(text) =>
                                        updateInfo('country', text)
                                    }
                                />
                                <TextField
                                    type={'number'}
                                    placeholder={'Введи количество серий'}
                                    label={`Количество серий`}
                                    value={dramamanwayPost.info.episodesNumber.toString()}
                                    onChange={(text) =>
                                        updateInfo(
                                            'episodesNumber',
                                            Number(text)
                                        )
                                    }
                                />
                                <TextField
                                    placeholder={'Введи следующую дораму'}
                                    label={`Название следующей дорамы`}
                                    value={dramamanwayPost.nextPostTitle}
                                    onChange={(text) =>
                                        updateDramamanwayPost(
                                            'nextPostTitle',
                                            text
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <Caste
                            value={dramamanwayPost.caste}
                            onChange={(caste) =>
                                updateDramamanwayPost('caste', caste)
                            }
                        />
                        <div className={s.twoFields}>
                            <TextField {...getStandardProps('about')} />
                            <TextField {...getStandardProps('idea')} />
                        </div>
                        <Score
                            score={dramamanwayPost.score}
                            onChange={(score) =>
                                updateDramamanwayPost('score', score)
                            }
                        />
                        <TextField {...getStandardProps('recommendation')} />
                    </div>
                    <div className={s.sections}>
                        <TextField {...getStandardProps('feedback')} />
                    </div>
                    <div className={s.sections}>
                        <TextField {...getStandardProps('negativeAspects')} />
                    </div>
                </div>
                <Footer dramamanwayPost={dramamanwayPost} />
            </div>
        </div>
    );
};
