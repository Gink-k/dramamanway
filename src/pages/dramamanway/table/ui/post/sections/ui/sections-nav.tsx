import React, { FC, useEffect } from 'react';
import { SECTIONS } from '../../../../../../../constants';
import { useSection } from '../lib';
import s from './styles.module.scss';
import cx from 'classnames';

export const SectionsNav: FC = () => {
    const [section, setSection, resetSection] = useSection();

    useEffect(() => () => resetSection(), []);

    return (
        <div className={s.sectionsNav}>
            {SECTIONS.map(({ icon, key, color }) => (
                <div
                    className={cx(section === key && s.active)}
                    style={{ backgroundColor: color }}
                    key={key}
                    onClick={() => setSection(key)}
                >
                    {icon}
                </div>
            ))}
        </div>
    );
};
