import { create } from 'zustand';
import { parseDramamanwayPost, win1251ToUtf8 } from '../lib';

const PUBLIC_URL = 'https://vk.com/wall-222752906?owners_only=1&q=';
const PROXY_URL = 'https://thingproxy.freeboard.io/fetch/'; // 'https://api.allorigins.win/raw?url='

type StoreState = {
    dramamanwayPosts: any[];
    fetchDramamanwayPosts: (url?: string) => void;
};

export const useStore = create<StoreState>()((set, get) => ({
    dramamanwayPosts: [],
    fetchDramamanwayPosts: async () => {
        /*
        const response = await fetch(
            PROXY_URL +
                encodeURIComponent(PUBLIC_URL + '[ По пути дорамщика ] #')
        );

        if (response.ok) {
            const buffer = await response.arrayBuffer();
            const html = win1251ToUtf8(buffer);

            for await (const post of parseDramamanwayPost(html)) {
                set({ dramamanwayPosts: [...get().dramamanwayPosts, post] });
            }
        }
         */
        for await (const post of parseDramamanwayPost()) {
            set({ dramamanwayPosts: [...get().dramamanwayPosts, post] });
        }
    },
}));

export const useDramamanwayPosts = () =>
    useStore((state) => state.dramamanwayPosts);

export const useDramamanwayPostsFetch = () =>
    useStore((state) => state.fetchDramamanwayPosts);
