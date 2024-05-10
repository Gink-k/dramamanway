import { create } from 'zustand';
import { useTableSort } from '../pages/dramamanway/table/lib';
import { DramamanwayPost } from '../types';
import { DramamanwayPostUtils, win1251ToUtf8 } from '../lib';
import { mockPage } from '../lib/mock';

const PUBLIC_URL = 'https://vk.com/wall-222752906';
const PROXY_URL = 'https://thingproxy.freeboard.io/fetch/'; // 'https://api.allorigins.win/raw?url='
const pagesRegex = /<div class="pg_in">(?<maxIndex>\d+)<\/div>/gm;

const constructURL = (offset: number) => {
    const url = new URL(PUBLIC_URL);

    url.searchParams.set('owners_only', '1');
    url.searchParams.set('q', '[ По пути дорамщика ] #');
    url.searchParams.set('offset', offset.toString());

    return PROXY_URL + encodeURIComponent(url.toString());
};

const getMaxIndex = (html: string) => {
    const pages = Array.from(html.matchAll(pagesRegex));
    const page = Number(pages[pages.length - 1]?.groups?.maxIndex) - 1;

    return Number.isNaN(page) ? -1 : page;
};

const OFFSET = 20;

type StoreState = {
    dramamanwayPosts: DramamanwayPost[];
    fetchDramamanwayPosts: (url?: string) => Promise<void>;
};

export const useStore = create<StoreState>()((set, get) => ({
    dramamanwayPosts: [],
    fetchDramamanwayPosts: async () => {
        let index = 0;
        let maxIndex = -1;

        do {
            /*
            const response = await fetch(constructURL(OFFSET * index));

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const buffer = await response.arrayBuffer();
            const html = win1251ToUtf8(buffer);

            if (maxIndex === -1) {
                maxIndex = getMaxIndex(html);
            }
        */
            const html = mockPage();

            for await (const post of DramamanwayPostUtils.parse(html)) {
                if (!post) {
                    return;
                }

                set({
                    dramamanwayPosts: [...get().dramamanwayPosts, post],
                });
            }
            ++index;
        } while (index <= maxIndex);
    },
}));

export const useDramamanwayPosts = (): DramamanwayPost[] =>
    useStore((state) => state.dramamanwayPosts);

export const useDramamanwayPostsFetch = () =>
    useStore((state) => state.fetchDramamanwayPosts);

export const useSortedDramamanwayPosts = () => {
    const posts = useDramamanwayPosts();
    const sort = useTableSort();
    const compare = (a: DramamanwayPost, b: DramamanwayPost) => {
        switch (sort.by) {
            case 'title':
                return a.info.title.ru.localeCompare(b.info.title.ru);
            case 'index':
                return a.index - b.index;
            default:
                return a.score[sort.by].value - b.score[sort.by].value;
        }
    };

    return [...posts].sort((a, b) => {
        const res = compare(a, b);

        return sort.order === 'asc' ? res : res * -1;
    });
};
