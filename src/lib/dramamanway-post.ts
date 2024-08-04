import { CasteUnit, DramamanwayPost, ScoreKey } from '../types';
import { clone } from './clone';
import {
    COLUMN_DESCRIPTION,
    DEFAULT_TAGS,
    DRAMAMANWAY_PARSE_TEMPLATE,
    EMPTY_CAST_UNIT,
    EMPTY_DRAMAMANWAY_POST,
    SCORE_KEYS,
    SECTIONS,
} from '../constants';
import { nanoid } from 'nanoid';
import { mockPage } from './mock';
import { toNumber } from './to-number';
import Notice from '../ui/notice';
import { getNoun } from './get-noun';
import { capitalize } from './capitalize';

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

const joinTitle = (title: string) => title.split(' ').map(capitalize).join('');

const TEXT_SECTIONS: (keyof DramamanwayPost)[] = [
    'about',
    'idea',
    'feedback',
    'negativeAspects',
    'recommendation',
];

const LOCALSTORAGE_KEY = 'new-dramamanway-post';
const PREV_POST_LOCALSTORAGE_KEY = 'prev-dramamanway-post';

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
                        wallText.match(DRAMAMANWAY_PARSE_TEMPLATE) || {};

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

    static saveToStorage(post: DramamanwayPost, key = LOCALSTORAGE_KEY) {
        localStorage.setItem(key, JSON.stringify(post));
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

    static newPost(prevPost: DramamanwayPost): DramamanwayPost {
        const post = DramamanwayPostUtils.getEmpty();

        DramamanwayPostUtils.saveToStorage(
            prevPost,
            PREV_POST_LOCALSTORAGE_KEY
        );
        DramamanwayPostUtils.saveToStorage(post);
        return post;
    }

    static getSectionConfig(key: keyof DramamanwayPost) {
        return SECTIONS.find((section) => section.key === key);
    }

    static getTags(post: DramamanwayPost): string[] {
        const tags: string[] = [
            ...DEFAULT_TAGS,
            joinTitle(post.info.title.ru),
            joinTitle(post.info.title.eng),
        ];

        post.caste.units.forEach((casteUnit) =>
            tags.push(
                joinTitle(casteUnit.actor.ru),
                joinTitle(casteUnit.actor.eng)
            )
        );

        return tags.map((tag) => '#' + tag);
    }

    static getRawCaste(post: DramamanwayPost): string {
        return (
            post.caste.raw ||
            post.caste.units.reduce(
                (acc, caste) =>
                    acc +
                    `${caste.actor.ru} (${caste.actor.eng}) - играет персонажа ${caste.character}. ${caste.comment}`,
                ''
            )
        );
    }

    static toDefaultPostString(post: DramamanwayPost): string {
        const getScore = (key: ScoreKey) =>
            `* ${COLUMN_DESCRIPTION[key]}: ${post.score[key].value} из 10${post.score[key].comment ? `(${post.score[key].comment})` : ''}`;

        return `[ По пути дорамщика ] #${post.index}

${post.info.title.ru} | ${post.info.title.eng} | ${post.info.title.original}

${post.info.year} год - ${post.info.episodesNumber} ${getNoun(post.info.episodesNumber, 'эпизод', 'эпизода', 'эпизодов')}

=== О чем 💬 ===:
${post.about}

=== Идея ✨ ===:
${post.idea}

=== Впечатления 🙀 ===:
${post.feedback}

=== Что не понравилось? 🚫 ===:
${post.negativeAspects}

=== Каст 👫 ===:
${DramamanwayPostUtils.getRawCaste(post)}

=== Оценки 💯 ===:
${getScore('plot')}
${getScore('dialogues')}
${getScore('idea')}
${getScore('soundtrack')}
${getScore('sufficiency')}
${getScore('caste')}
${getScore('rewatchingChance')}
-----
${getScore('cliche')}
${getScore('stupidity')}
${getScore('tightness')}
-----
${getScore('finalScore')}

=== Рекомендация к просмотру 📺 ===:
${post.recommendation}

=== Следующая остановка "${post.nextPostTitle}" 🚌 ===

${DramamanwayPostUtils.getTags(post).join(' ')}
`;
    }
}
