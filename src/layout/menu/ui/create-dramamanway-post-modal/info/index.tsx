import { FC } from 'react';
import TextField from '../../../../../ui/text-field';
import {
    useDramamanwayPost,
    useUpdateDramamanwayPost,
    useUpdateInfo,
} from '../../../lib';
import { Tile } from '../../../../../ui/tile';
import s from './styles.module.scss';

export const Info: FC = () => {
    const dramamanwayPost = useDramamanwayPost();
    const updateInfo = useUpdateInfo();
    const updateDramamanwayPost = useUpdateDramamanwayPost();

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