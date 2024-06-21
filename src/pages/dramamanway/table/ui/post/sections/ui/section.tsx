import React, { FC, useEffect, useRef } from 'react';
import s from './styles.module.scss';

type SectionProps = {
    title?: string;
    children?: string;
    scrollIntoView?: boolean;
};

export const Section: FC<SectionProps> = ({
    children,
    title,
    scrollIntoView,
}) => {
    const $container = useRef<HTMLDivElement>(null);
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if (scrollIntoView)
            $container.current?.scrollIntoView({ behavior: 'smooth' });
    }, [scrollIntoView]);

    return (
        <div ref={$container}>
            <p className={s.sectionTitle}>{title}</p>
            <p dangerouslySetInnerHTML={{ __html: children || '' }}></p>
        </div>
    );
};
