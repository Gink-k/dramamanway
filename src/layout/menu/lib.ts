import { createContext, Dispatch, SetStateAction } from 'react';
import { DramamanwayPost } from '../../types';
import { EMPTY_DRAMAMANWAY_POST } from '../../constants';

type CreateDramamanwayPostModalContext = {
    dramamanwayPost: DramamanwayPost;
    setDramamanwayPost: Dispatch<SetStateAction<DramamanwayPost>>;
};

export const createDramamanwayPostModalContext =
    createContext<CreateDramamanwayPostModalContext>({
        dramamanwayPost: EMPTY_DRAMAMANWAY_POST,
        setDramamanwayPost: () => 0,
    });

export const update = <T, K extends keyof T = keyof T>(
    obj: T,
    key: K,
    value: SetStateAction<T[K]>
): T => ({
    ...obj,
    [key]: typeof value === 'function' ? (value as Function)(obj[key]) : value,
});
