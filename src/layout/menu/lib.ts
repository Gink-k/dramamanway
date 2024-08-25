import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { DramamanwayPost, DramamanwayPostInfo, DramamanwayPostKey } from '../../types';
import { EMPTY_DRAMAMANWAY_POST, SECTIONS_DICT } from '../../constants';
import s from './ui/create-dramamanway-post-modal/styles.module.scss';

type CreateDramamanwayPostModalContext = {
    dramamanwayPost: DramamanwayPost;
    setDramamanwayPost: Dispatch<SetStateAction<DramamanwayPost>>;
};

export const createDramamanwayPostModalContext =
    createContext<CreateDramamanwayPostModalContext>({
        dramamanwayPost: EMPTY_DRAMAMANWAY_POST,
        setDramamanwayPost: () => 0,
    });

export const useCreateDramamanwayPostModalContext = () =>
    useContext(createDramamanwayPostModalContext);

export const useDramamanwayPost = () => {
    return useCreateDramamanwayPostModalContext().dramamanwayPost;
};

export const update = <T, K extends keyof T = keyof T>(
    obj: T,
    key: K,
    value: SetStateAction<T[K]>
): T => ({
    ...obj,
    [key]: typeof value === 'function' ? (value as Function)(obj[key]) : value,
});

type KeyValueUpdater<Base = DramamanwayPost> = <T extends keyof Base>(
    key: T,
    value: SetStateAction<Base[T]>
) => void;

type SimpleUpdater<T extends DramamanwayPostKey> = Dispatch<
    SetStateAction<DramamanwayPost[T]>
>;

export function useUpdateDramamanwayPost(): KeyValueUpdater;
export function useUpdateDramamanwayPost<T extends DramamanwayPostKey>(
    key: T
): SimpleUpdater<T>;
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

    return (key, value) =>
        updateDramamanwayPost((prevState) => update(prevState, key, value));
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
