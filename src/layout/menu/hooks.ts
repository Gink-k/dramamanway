import { DramamanwayPost, DramamanwayPostInfo, DramamanwayPostKey } from '../../types';
import { EMPTY_DRAMAMANWAY_POST, SECTIONS_DICT } from '../../constants';
import s from './ui/create-dramamanway-post-modal/styles.module.scss';
import { Dispatch, SetStateAction, useCallback, useContext, useState } from 'react';
import { createDramamanwayPostModalContext, update } from './lib';
import { DramamanwayPostUtils } from '../../lib';
import { useDramamanwayPostMaxIndex, usePersistDramamanwayPost } from '../../hooks';

type KeyValueUpdater<Base = DramamanwayPost> = <T extends keyof Base>(
    key: T,
    value: SetStateAction<Base[T]>
) => void;

type SimpleUpdater<T extends DramamanwayPostKey> = Dispatch<SetStateAction<DramamanwayPost[T]>>;

export const useNewDramamanwayPost = () => {
    const maxIndex = useDramamanwayPostMaxIndex();
    const [post, setPost] = useState(() => {
        const post = DramamanwayPostUtils.getFromStorage();

        if (post.index === EMPTY_DRAMAMANWAY_POST.index) {
            post.index = maxIndex + 1;
        }
        return post;
    });

    const setPostWithIndex = useCallback(
        (post: SetStateAction<DramamanwayPost>) =>
            setPost((prevState) => {
                const controlIndex = (p: DramamanwayPost) =>
                    p.index === EMPTY_DRAMAMANWAY_POST.index ? { ...p, index: maxIndex + 1 } : p;

                return controlIndex(typeof post === 'function' ? post(prevState) : post);
            }),
        [maxIndex]
    );

    usePersistDramamanwayPost(post);
    return [post, setPostWithIndex] as const;
};

export const useCreateDramamanwayPostModalContext = () =>
    useContext(createDramamanwayPostModalContext);

export const useDramamanwayPost = () => {
    return useCreateDramamanwayPostModalContext().dramamanwayPost;
};

export function useUpdateDramamanwayPost(): KeyValueUpdater;
export function useUpdateDramamanwayPost<T extends DramamanwayPostKey>(key: T): SimpleUpdater<T>;
export function useUpdateDramamanwayPost<T extends DramamanwayPostKey>(
    key?: T
): KeyValueUpdater | SimpleUpdater<T> {
    const { setDramamanwayPost } = useCreateDramamanwayPostModalContext();

    if (key) {
        return (value: any) => setDramamanwayPost((post) => update(post, key, value));
    }
    return (key, value) => {
        setDramamanwayPost((post) => update(post, key, value));
    };
}

export const useUpdateInfo = (): KeyValueUpdater<DramamanwayPostInfo> => {
    const updateDramamanwayPost = useUpdateDramamanwayPost('info');

    return (key, value) => updateDramamanwayPost((prevState) => update(prevState, key, value));
};

export const useSectionTextFieldProps = (key: keyof typeof SECTIONS_DICT) => {
    const dramamanwayPost = useDramamanwayPost();
    const updateDramamanwayPost = useUpdateDramamanwayPost();

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
