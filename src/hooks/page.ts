import {create} from "zustand";
import {parseDramamanwayPost} from "../lib";

const PUBLIC_URL = 'https://m.vk.com/club222752906';

type StoreState = {
    page: string
    dramamanwayPosts: any[]
    fetchPage: (url?: string) => void
}

export const useStore = create<StoreState>()((set) => ({
    page: '',
    dramamanwayPosts: [],
    fetchPage: async (url = PUBLIC_URL) => {
        const headers = new Headers({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        })
        const response = await fetch('https://thingproxy.freeboard.io/fetch/' + encodeURIComponent(url), {
            headers,
            cache: 'no-cache'
        });

        console.log(response)
        if (response.ok) {
            const page = await response.text();
            const dramamanwayPosts = parseDramamanwayPost(page);

            console.log(page)
            set({page, dramamanwayPosts});
        }
    },
}))