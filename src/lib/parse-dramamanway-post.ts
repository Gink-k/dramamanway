import { mockPage } from './mock';
import type { DramamanwayPost } from '../types';
import { KEYS } from '../constants';
import { nanoid } from 'nanoid';
import { DRAMAMANWAY_TEMPLATE } from './dramamanway-template';

const toNumber = (raw: string) => {
    const res = Number(raw);

    return Number.isNaN(res) ? -1 : res;
};

const getWallInnerHtml = (post: HTMLElement) => {
    const wall = post.querySelector('.wall_post_text');

    if (!wall) {
        return '';
    }

    wall.querySelectorAll('img, button').forEach((img) => img.remove());

    wall
        .querySelectorAll('span, em')
        ?.forEach((elem) => elem.replaceWith(...Array.from(elem.childNodes)));

    return wall.innerHTML;
};

const parseImageSrc = (parsedPost: DramamanwayPost, post: HTMLElement) => {
    parsedPost.image.src =
        (
            post.querySelector(
                'img.PhotoPrimaryAttachment__imageElement'
            ) as HTMLImageElement
        )?.src || '';
};

const TEXT_SECTIONS: (keyof DramamanwayPost)[] = [
    'about',
    'idea',
    'feedback',
    'negativeAspects',
    'caste',
    'recommendation',
];

export async function* parseDramamanwayPost(
    html = mockPage()
): AsyncGenerator<DramamanwayPost> {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const posts = doc.querySelectorAll(
        '.wall_post_cont'
    ) as NodeListOf<HTMLElement>;

    for (let i = 0; i < posts.length; ++i) {
        yield await new Promise((resolve) =>
            setTimeout(() => {
                const parsedPost = {
                    id: nanoid(),
                    score: {},
                    image: {},
                    info: {},
                } as DramamanwayPost;

                parseImageSrc(parsedPost, posts[i]);

                const wallText = getWallInnerHtml(posts[i]);

                if (!wallText) {
                    return;
                }
                const { groups = {} } =
                    wallText.match(DRAMAMANWAY_TEMPLATE) || {};

                parsedPost.info = {
                    title: {
                        ru: groups.titleRu || '',
                        eng: groups.titleEng || '',
                        original: groups.titleOriginal || '',
                    },
                    country: groups.country || '',
                    year: toNumber(groups.year),
                    episodesNumber: toNumber(groups.episodesNumber),
                };
                parsedPost.index = toNumber(groups.index);
                TEXT_SECTIONS.forEach(
                    // @ts-ignore
                    (key) => (parsedPost[key] = groups[key + 'Section'])
                );

                KEYS.forEach((key) => {
                    parsedPost.score[key] = {
                        value: toNumber(groups[key]),
                        comment: (groups[key + 'Comment'] || '').trim(),
                    };
                });

                parsedPost.nextPostTitle = groups.nextPost || '';

                resolve(parsedPost);
            }, 10 * i)
        );
    }
}
