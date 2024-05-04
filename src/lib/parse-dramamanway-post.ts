import { mockPage } from './mock';
import type { DramamanwayPost, Score, ScoreKey } from '../types';
import { KEYS, KEYS_DESCRIPTION } from '../constants';
import { nanoid } from 'nanoid';
import { DRAMAMANWAY_TEMPLATE } from './dramamanway-template';

const parsePoint = (text: string, key: ScoreKey): Score => {
    // @TODO comment
    const regex = new RegExp(
        KEYS_DESCRIPTION[key] + '\\s*-\\s*(?<value>\\d\\d?)\\s*из\\s*10',
        'i'
    );

    const match = text.match(regex);
    const value = Number(match?.groups?.value);

    return {
        value: Number.isNaN(value) ? 0 : value,
        comment: match?.groups?.comment || '',
    };
};

export const parseDramamanwayPost = (http: string = mockPage()) => {
    const doc = document.createElement('html');
    const parsedPosts: DramamanwayPost[] = [];

    doc.innerHTML = http;

    const posts = doc.querySelectorAll('.wall_post_cont');

    console.log('here');
    Array.from(posts)
        .slice(0, 1)
        .forEach((post, idx) =>
            setTimeout(() => {
                const parsedPost = {
                    id: nanoid(),
                    points: {},
                } as DramamanwayPost;

                post.querySelector('button')?.remove();
                parsedPost.image =
                    (
                        post.querySelector(
                            'img.PhotoPrimaryAttachment__imageElement'
                        ) as HTMLImageElement
                    )?.src || '';

                const wallText = post.querySelector('.wall_post_text');
                const text = wallText?.textContent || '';

                console.log(text, DRAMAMANWAY_TEMPLATE);
                console.log(text.match(DRAMAMANWAY_TEMPLATE));
            }, 10 * idx)
        );

    return parsedPosts;
};
