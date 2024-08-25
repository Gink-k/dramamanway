import { Dispatch, SetStateAction } from 'react';
import { DramamanwayPost, DramamanwayPostInfo, DramamanwayPostKey } from '../../types';

export const update = <T, K extends keyof T = keyof T>(
    obj: T,
    key: K,
    value: SetStateAction<T[K]>
): T => ({
    ...obj,
    [key]: typeof value === 'function' ? (value as Function)(obj[key]) : value,
});

export const updateDramamanwayPostBase = <T extends DramamanwayPostKey>(
    setDramamanwayPost: Dispatch<SetStateAction<DramamanwayPost>>,
    key: T,
    value: SetStateAction<DramamanwayPost[T]>
) => setDramamanwayPost((post) => update(post, key, value));

export const updateInfoBase = <T extends keyof DramamanwayPostInfo>(
    setDramamanwayPost: Dispatch<SetStateAction<DramamanwayPost>>,
    key: T,
    value: SetStateAction<DramamanwayPostInfo[T]>
) =>
    updateDramamanwayPostBase(setDramamanwayPost, 'info', (prevState) =>
        update(prevState, key, value)
    );
