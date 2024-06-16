import React, { FC, ReactNode } from 'react';

type SectionProps = {
    children?: string;
};

export const Section: FC<SectionProps> = ({ children }) => {
    return <p dangerouslySetInnerHTML={{ __html: children || '' }}></p>;
};
