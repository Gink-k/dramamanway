import { create } from 'zustand';
import { ColumnKey, Sort } from '../../../types';

export type TableSort = Sort<ColumnKey>;

export type TableStoreState = {
    sort: TableSort;
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
}));

export const useTableSort = () => useTableStore((state) => state.sort);
export const useTableSetSort = () => useTableStore((state) => state.setSort);
export const useTableToggleSort = () =>
    useTableStore((state) => state.toggleSort);
