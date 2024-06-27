import { CasteUnit, DramamanwayPost } from '../types';
import { clone } from './clone';
import {
    DRAMAMANWAY_TEMPLATE,
    EMPTY_CAST_UNIT,
    EMPTY_DRAMAMANWAY_POST,
    SCORE_KEYS,
    SECTIONS,
} from '../constants';
import { nanoid } from 'nanoid';
import { mockPage } from './mock';
import { toNumber } from './to-number';
import Notice from '../ui/notice';

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
                'img.PhotoPrimaryAttachment__imageElement, img.MediaGrid__imageElement'
            ) as HTMLImageElement
        )?.src || '';
};

// @TODO
const parseCasteUnits = (caste: string): CasteUnit[] => {
    const lines = caste.split('\n');
    const res: CasteUnit[] = [];

    return res;
};

const TEXT_SECTIONS: (keyof DramamanwayPost)[] = [
    'about',
    'idea',
    'feedback',
    'negativeAspects',
    'recommendation',
];

const LOCALSTORAGE_KEY = 'new-dramamanway-post';

export class DramamanwayPostUtils {
    static getEmptyCasteUnit() {
        return clone(EMPTY_CAST_UNIT);
    }

    static getEmpty(): DramamanwayPost {
        const empty = clone(EMPTY_DRAMAMANWAY_POST);

        empty.caste.units = [
            DramamanwayPostUtils.getEmptyCasteUnit(),
            DramamanwayPostUtils.getEmptyCasteUnit(),
        ];
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
                    parsedPost.caste.raw = groups.casteSection;
                    parsedPost.caste.units = parseCasteUnits(
                        parsedPost.caste.raw || ''
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

    static saveToStorage(post: DramamanwayPost) {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(post));
    }

    static getFromStorage = (): DramamanwayPost => {
        let post: DramamanwayPost | null = null;

        try {
            post = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '');
        } catch (_) {
            Notice.error('Failed to get post from LocalStorage');
        }

        return post ?? DramamanwayPostUtils.getEmpty();
    };

    static getSectionConfig(key: keyof DramamanwayPost) {
        return SECTIONS.find((section) => section.key === key);
    }
}
