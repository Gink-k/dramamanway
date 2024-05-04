import { create } from 'zustand';
import { parseDramamanwayPost } from '../lib';

const PUBLIC_URL = 'https://vk.com/wall-222752906?owners_only=1&q=';
const PROXY_URL = 'https://thingproxy.freeboard.io/fetch/'; // 'https://api.allorigins.win/raw?url='

type StoreState = {
    dramamanwayPosts: any[];
    fetchDramamanwayPosts: (url?: string) => void;
};

export const useStore = create<StoreState>()((set) => ({
    dramamanwayPosts: [],
    fetchDramamanwayPosts: async () => {
        const response = await fetch(
            PROXY_URL +
                encodeURIComponent(PUBLIC_URL + '[ По пути дорамщика ] #')
        );

        if (response.ok) {
            const page = await response.text();
            const dramamanwayPosts = await parseDramamanwayPost(page);

            console.log(dramamanwayPosts);
            set({ dramamanwayPosts });
        }
    },
}));
