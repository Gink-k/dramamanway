import { DramamanwayPost } from '../types';
import { clone } from './clone';
import {
    EMPTY_DRAMAMANWAY_POST,
    SCORE_KEYS,
    DRAMAMANWAY_TEMPLATE,
} from '../constants';
import { nanoid } from 'nanoid';
import { mockPage } from './mock';
import { toNumber } from './to-number';

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

export class DramamanwayPostUtils {
    static getEmpty(): DramamanwayPost {
        const empty = clone(EMPTY_DRAMAMANWAY_POST);

        empty.id = nanoid();
        return empty;
    }

    static async *parse(
        html = mockPage()
    ): AsyncGenerator<DramamanwayPost | null> {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const posts = doc.querySelectorAll('.post') as NodeListOf<HTMLElement>;

        for (let i = 0; i < posts.length; ++i) {
            yield await new Promise((resolve) =>
                setTimeout(() => {
                    const parsedPost = DramamanwayPostUtils.getEmpty();

                    parseImageSrc(parsedPost, posts[i]);

                    const wallText = getWallInnerHtml(posts[i]);

                    if (!wallText) {
                        return resolve(null);
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

                    SCORE_KEYS.forEach((key) => {
                        parsedPost.score[key] = {
                            value: toNumber(groups[key]),
                            comment: (groups[key + 'Comment'] || '').trim(),
                        };
                    });

                    parsedPost.nextPostTitle = groups.nextPost || '';
                    parsedPost.text = wallText;

                    resolve(parsedPost);
                }, 10 * i)
            );
        }
    }
}
