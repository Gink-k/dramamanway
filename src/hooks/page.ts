import { create } from 'zustand';
import { useTableSort } from '../pages/dramamanway/table/lib';
import { DramamanwayPost } from '../types';
import { DramamanwayPostUtils, win1251ToUtf8 } from '../lib';
import { EMPTY_SCORE_VALUE } from '../constants';

type ArgsType<T> = T extends (...args: infer A) => any ? A : never;

const PUBLIC_URL = 'https://vk.com/wall-222752906';
const PROXY_URL = 'http://localhost:3000/fetch/'; // 'https://thingproxy.freeboard.io/fetch/'
const PAGES_REGEX = /<div class="pg_in">(?<maxIndex>\d+)<\/div>/gm;
const USER_AGENT =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const constructURL = (offset: number) => {
    const url = new URL(PUBLIC_URL);

    url.searchParams.set('owners_only', '1');
    url.searchParams.set('q', '[ по пути дорамщика ] #dramamanway');
    url.searchParams.set('offset', offset.toString());

    return PROXY_URL + encodeURIComponent(url.toString());
};

const getMaxIndex = (html: string) => {
    const pages = Array.from(html.matchAll(PAGES_REGEX));
    const page = Number(pages[pages.length - 1]?.groups?.maxIndex) - 1;

    return Number.isNaN(page) ? -1 : page;
};

const getHTML = async (response: Response) => {
    const buffer = await response.arrayBuffer();

    return win1251ToUtf8(buffer);
};

const getFetchArgs = (index: number): ArgsType<typeof fetch> => {
    return [
        constructURL(index * OFFSET),
        {
            headers: { 'New-User-Agent': USER_AGENT },
        },
    ];
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
            const response = await fetch(...getFetchArgs(index));

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const html = await getHTML(response); //mockPage();

            if (maxIndex === -1) {
                maxIndex = getMaxIndex(html);
            }

            for await (const post of DramamanwayPostUtils.parse(html)) {
                if (post) {
                    set({
                        dramamanwayPosts: [...get().dramamanwayPosts, post],
                    });
                }
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
    const order = sort.order === 'asc' ? 1 : -1;

    const compareTwo = <T extends number | string = number>(v1: T, v2: T) => {
        if (v1 === EMPTY_SCORE_VALUE || v1 === '') {
            return v1 === v2 ? 0 : order;
        }
        if (v2 === EMPTY_SCORE_VALUE || v2 === '') {
            return -1 * order;
        }
        return typeof v1 === 'string'
            ? v1.localeCompare(v2 as string)
            : (v1 as number) - (v2 as number);
    };

    const compare = (a: DramamanwayPost, b: DramamanwayPost) => {
        switch (sort.by) {
            case 'title':
                return compareTwo(a.info.title.ru, b.info.title.ru);
            case 'index':
                return compareTwo(a.index, b.index);
            case 'county':
                return compareTwo(a.info.country, b.info.country);
            default:
                return compareTwo(a.score[sort.by].value, b.score[sort.by].value);
        }
    };

    return [...posts].sort((a, b) => {
        const res = compare(a, b);

        return order * res;
    });
};

export const useDramamanwayPostMaxIndex = (): number => {
    const posts = useDramamanwayPosts();

    return posts.reduce((acc, elem) => Math.max(acc, elem.index), 0);
};
