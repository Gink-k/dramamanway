import { Dispatch, FC, SetStateAction } from 'react';
import TextField from '../../../../../ui/text-field';
import { DramamanwayPost } from '../../../../../types';
import { updateDramamanwayPostBase, updateInfoBase } from '../../../lib';
import { Tile } from '../tile';
import s from './styles.module.scss';

type InfoProps = {
    dramamanwayPost: DramamanwayPost;
    setDramamanwayPost: Dispatch<SetStateAction<DramamanwayPost>>;
};

export const Info: FC<InfoProps> = ({ setDramamanwayPost, dramamanwayPost }) => {
    const updateInfo = updateInfoBase.bind(null, setDramamanwayPost);
    const updateDramamanwayPost = updateDramamanwayPostBase.bind(
        null,
        setDramamanwayPost
    );

    return (
        <Tile className={s.restInfo}>
            <TextField
                variant={'transparent'}
                type={'number'}
                placeholder={'Введи индекс'}
                label={`Индекс`}
                value={dramamanwayPost.index.toString()}
                onChange={(text) => updateDramamanwayPost('index', Number(text))}
            />
            <TextField
                placeholder={'Введи страну'}
                label={`Страна`}
                value={dramamanwayPost.info.country}
                onChange={(text) => updateInfo('country', text)}
            />
            <TextField
                type={'number'}
                placeholder={'Введи год'}
                label={`Год`}
                value={dramamanwayPost.info.year.toString()}
                onChange={(text) => updateInfo('year', Number(text))}
            />
            <TextField
                type={'number'}
                placeholder={'Введи количество серий'}
                label={`Количество серий`}
                value={dramamanwayPost.info.episodesNumber.toString()}
                onChange={(text) => updateInfo('episodesNumber', Number(text))}
            />
            <TextField
                placeholder={'Введи следующую дораму'}
                label={`Название следующей дорамы`}
                value={dramamanwayPost.nextPostTitle}
                onChange={(text) => updateDramamanwayPost('nextPostTitle', text)}
            />
        </Tile>
    );
};
