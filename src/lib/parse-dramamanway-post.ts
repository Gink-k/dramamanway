import { mockPage } from './mock';
import type { DramamanwayPost } from '../types';
import { KEYS } from '../constants';
import { nanoid } from 'nanoid';

const toRegex = (regex: string) => {
    return new RegExp(
        regex.replaceAll(' ', '\\s+').replace(/^/gm, '\\s*'),
        'is'
    );
};

const toNumber = (raw: string) => {
    const res = Number(raw);

    return Number.isNaN(res) ? -1 : res;
};

const SCORE_REGEX = toRegex(
    `\\* Сюжет - (?<plot>\\d\\d?) из 10(?<plotComment>.*)
\\* Диалоги - (?<dialogues>\\d\\d?) из 10(?<dialoguesComment>.*)
\\* Реализация идеи - (?<idea>\\d\\d?) из 10(?<ideaComment>.*)
\\* Саундтрек - (?<soundtrack>\\d\\d?) из 10(?<soundtrackComment>.*)
\\* Достаточность\\(отсутствие лишнего\\) - (?<sufficiency>\\d\\d?) из 10(?<sufficiencyComment>.*)
\\* Каст - (?<caste>\\d\\d?) из 10(?<casteComment>.*)
\\* Вероятность, что я пересмотрю - (?<rewatchingChance>\\d\\d?) из 10(?<rewatchingChanceComment>.*)`
);

const parseScore = (post: DramamanwayPost, section: string) => {
    const res = section.match(SCORE_REGEX)?.groups || {};

    KEYS.forEach((key) => {
        post.score[key] = {
            value: toNumber(res[key]),
            comment: (res[key + 'Comment'] || '').trim(),
        };
    });
};

const parseImageSrc = (parsedPost: DramamanwayPost, post: HTMLElement) => {
    parsedPost.image.src =
        (
            post.querySelector(
                'img.PhotoPrimaryAttachment__imageElement'
            ) as HTMLImageElement
        )?.src || '';
};

const SECTION_SPLITTER = toRegex(
    '(' +
        '=== О чем . ===:|' +
        '=== Идея . ===:|' +
        '=== Впечатления . ===:|' +
        '=== Что не по\\s*нравилось\\? . ===:|' +
        '=== Каст . ===:|' +
        '=== Оценки . ===:|' +
        '=== Рекомендация к просмотру . ===:' +
        ')'
);

const getSections = (text: string) => {
    return text.split(SECTION_SPLITTER).filter((_, index) => index % 2 === 0);
};

const HEADER_REGEX = toRegex(`\\[ По пути дорамщика ] #(?<index>\\d\\d?)

(?<titleRu>.+) \\| (?<titleEng>.+) \\| (?<titleOriginal>.+)

((?<country>.+) - )?(?<year>\\d{4}) год - (?<episodesNumber>\\d+).+`);

const parseInfo = (post: DramamanwayPost, section: string) => {
    const res = section.match(HEADER_REGEX)?.groups || {};

    post.info = {
        title: {
            ru: res.titleRu || '',
            eng: res.titleEng || '',
            original: res.titleOriginal || '',
        },
        episodesNumber: toNumber(res.episodesNumber),
        country: res.country || '',
        year: toNumber(res.year),
    };
};

const SECTIONS_INDEXES = {
    info: 0,
    about: 1,
    idea: 2,
    feedback: 3,
    negativeAspects: 4,
    caste: 5,
    score: 6,
    recommendation: 7,
} as const satisfies Partial<Record<keyof DramamanwayPost, number>>;

const TEXT_SECTION_INDEXES = {
    ...SECTIONS_INDEXES,
    info: undefined,
    score: undefined,
};

const parseTextSections = (post: DramamanwayPost, sections: string[]) => {
    Object.entries(TEXT_SECTION_INDEXES).forEach(([key, index]) => {
        if (index === undefined) return;
        // @ts-ignore
        post[key] = (sections[index] || '').trim();
    });
};

export const parseDramamanwayPost = (
    http: string = mockPage()
): Promise<DramamanwayPost[]> => {
    const doc = document.createElement('html');
    const parsedPosts: DramamanwayPost[] = [];

    doc.innerHTML = http;

    const posts = doc.querySelectorAll(
        '.wall_post_cont'
    ) as NodeListOf<HTMLElement>;

    console.log(posts.length);
    return new Promise((resolve) =>
        posts.forEach((post, idx) =>
            setTimeout(() => {
                const parsedPost = {
                    id: nanoid(),
                    score: {},
                    image: {},
                    info: {},
                } as DramamanwayPost;

                parseImageSrc(parsedPost, post);

                const wallText = post.querySelector('.wall_post_text');
                const text = wallText?.textContent || '';
                const sections = getSections(text);

                parseInfo(parsedPost, sections[SECTIONS_INDEXES.info]);
                parseTextSections(parsedPost, sections);
                parseScore(parsedPost, sections[SECTIONS_INDEXES.score]);

                parsedPosts.push(parsedPost);

                if (parsedPosts.length === posts.length) {
                    resolve(parsedPosts);
                }
            }, 10 * idx)
        )
    );
};
