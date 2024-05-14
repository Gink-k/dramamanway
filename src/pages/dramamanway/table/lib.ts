import { create } from 'zustand';
import { ColumnKey, DramamanwayPost, Sort } from '../../../types';

export type TableSort = Sort<ColumnKey>;

export type TableStoreState = {
    openedPost: DramamanwayPost | null;
    sort: TableSort;
    openPost: (post: DramamanwayPost) => void;
    closePost: () => void;
    setSort: (sort: TableSort) => void;
    toggleSort: (by?: TableSort['by']) => void;
};
export const useTableStore = create<TableStoreState>()((set, get) => ({
    sort: { by: 'index', order: 'desc' },
    setSort: (sort) => set({ sort }),
    toggleSort: (by) => {
        set((state) => ({
            sort: {
                by: by || state.sort.by,
                order:
                    by && by !== state.sort.by
                        ? 'desc'
                        : state.sort.order === 'asc'
                          ? 'desc'
                          : 'asc',
            },
        }));
    },
    openedPost: null,
    openPost: (openedPost) => set({ openedPost }),
    closePost: () => set({ openedPost: null }),
}));

export const useTableSort = () => useTableStore((state) => state.sort);
export const useTableSetSort = () => useTableStore((state) => state.setSort);
export const useTableToggleSort = () =>
    useTableStore((state) => state.toggleSort);

export const useTableOpenedPost = () =>
    useTableStore((state) => state.openedPost);
export const useTableOpenPost = () => useTableStore((state) => state.openPost);
export const useTableClosePost = () =>
    useTableStore((state) => state.closePost);
