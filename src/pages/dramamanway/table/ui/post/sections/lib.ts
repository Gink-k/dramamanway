import { create } from 'zustand';
import { SECTIONS } from '../../../../../../constants';
import { useShallow } from 'zustand/react/shallow';

type SectionKey = (typeof SECTIONS)[number]['key'];

type SectionsStoreState = {
    currentSection: SectionKey;
    setCurrentSection: (section: SectionKey) => void;
    resetCurrentSection: () => void;
};

const INITIAL_CURRENT_SECTIONS = 'about';

export const useSectionsStore = create<SectionsStoreState>()((set, get) => ({
    currentSection: INITIAL_CURRENT_SECTIONS,
    setCurrentSection: (currentSection) => set({ currentSection }),
    resetCurrentSection: () =>
        set({ currentSection: INITIAL_CURRENT_SECTIONS }),
}));

export const useSection = () =>
    useSectionsStore(
        useShallow(
            (state) =>
                [
                    state.currentSection,
                    state.setCurrentSection,
                    state.resetCurrentSection,
                ] as const
        )
    );
