import { FC, useState } from 'react';
import { DramamanwayPostUtils } from '../../../../lib';
import TextField from '../../../../ui/text-field';
import { TitleKey } from '../../../../types';
import { LOCALES, SECTIONS_DICT } from '../../../../constants';
import { usePersistDramamanwayPost } from '../../../../hooks';
import s from './styles.module.scss';
import { Caste } from './caste';
import { Score } from './score';
import { Footer } from './footer';
import cx from 'classnames';
import { Info } from './info';
import { update, updateDramamanwayPostBase, updateInfoBase } from '../../lib';
import { Tile } from './tile';

type CreateModalContentProps = {};

export const CreateModalContent: FC<CreateModalContentProps> = ({}) => {
    const [dramamanwayPost, setDramamanwayPost] = useState(() =>
        DramamanwayPostUtils.getFromStorage()
    );
    usePersistDramamanwayPost(dramamanwayPost);

    const updateDramamanwayPost = updateDramamanwayPostBase.bind(
        null,
        setDramamanwayPost
    );

    const updateTitle = (key: TitleKey, value: string) =>
        updateInfoBase(setDramamanwayPost, 'title', (prevState) =>
            update(prevState, key, value)
        );

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
            <div className={cx(s.titles, s.tile)}>
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
            </div>
            <div className={s.main}>
                <Info
                    dramamanwayPost={dramamanwayPost}
                    setDramamanwayPost={setDramamanwayPost}
                />
                <Caste
                    value={dramamanwayPost.caste}
                    onChange={(caste) => updateDramamanwayPost('caste', caste)}
                />
                <Tile className={s.about}>
                    <TextField {...getStandardProps('about')} />
                </Tile>
                <Tile className={s.idea}>
                    <TextField {...getStandardProps('idea')} />
                </Tile>
                <Score
                    score={dramamanwayPost.score}
                    onChange={(score) => updateDramamanwayPost('score', score)}
                />
                <TextField {...getStandardProps('recommendation')} />
                <TextField {...getStandardProps('feedback')} />
                <TextField {...getStandardProps('negativeAspects')} />
                <Footer
                    dramamanwayPost={dramamanwayPost}
                    onNewPost={() =>
                        setDramamanwayPost(DramamanwayPostUtils.newPost(dramamanwayPost))
                    }
                />
            </div>
        </div>
    );
};
