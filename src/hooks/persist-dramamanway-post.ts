import { useEffect } from 'react';
import { DramamanwayPost } from '../types';
import { DramamanwayPostUtils } from '../lib';
import Notice from '../ui/notice';

export const usePersistDramamanwayPost = (dramamanwayPost: DramamanwayPost) => {
    useEffect(() => {
        try {
            DramamanwayPostUtils.saveToStorage(dramamanwayPost);
        } catch (e) {
            Notice.error(`Could not save dramamanway post: ${e}`);
        }
    }, [dramamanwayPost]);
};
