import React, { FC } from 'react';
import s from './styles.module.scss';
import { Section } from './section';
import { DramamanwayPost } from '../../../../../../../types';
import { SECTIONS } from '../../../../../../../constants';
import { useSection } from '../lib';
import { SectionsNav } from './sections-nav';

type SectionsProps = {
    post: DramamanwayPost;
};

const SectionsBase: FC<SectionsProps> = ({ post }) => {
    const [section] = useSection();

    return (
        <div className={s.sections}>
            {SECTIONS.map(
                ({ key, description, icon }) =>
                    key === 'score' || (
                        <Section
                            key={key}
                            scrollIntoView={key === section}
                            title={description + icon}
                        >
                            {key === 'caste' ? post[key].raw : post[key]}
                        </Section>
                    )
            )}
        </div>
    );
};

export const Sections = Object.assign(SectionsBase, {
    Navigation: SectionsNav,
});
