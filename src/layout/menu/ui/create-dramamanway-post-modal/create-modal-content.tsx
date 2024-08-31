import { FC, useState } from 'react';
import { DramamanwayPostUtils } from '../../../../lib';
import { usePersistDramamanwayPost } from '../../../../hooks';
import s from './styles.module.scss';
import { Caste } from './caste';
import { Score } from './score';
import { Footer } from './footer';
import { Info } from './info';
import { createDramamanwayPostModalContext } from '../../lib';
import { Titles } from './titles';
import { About } from './about';
import { Idea } from './idea';
import { Recommendation } from './recommendation';

type CreateModalContentProps = {};

export const CreateModalContent: FC<CreateModalContentProps> = ({}) => {
    const [dramamanwayPost, setDramamanwayPost] = useState(() =>
        DramamanwayPostUtils.getFromStorage()
    );
    usePersistDramamanwayPost(dramamanwayPost);

    return (
        <createDramamanwayPostModalContext.Provider
            value={{ dramamanwayPost, setDramamanwayPost }}
        >
            <div className={s.createModalContainer}>
                <div className={s.body}>
                    <Titles />
                    <div className={s.row}>
                        <Info />
                        <Caste />
                    </div>
                    <About />
                    <Idea />
                    <div className={s.row}>
                        <Score />
                        <Recommendation />
                    </div>
                </div>
                {/*<Feedback />*/}
                {/*<NegativeAspects />*/}
                <Footer />
            </div>
        </createDramamanwayPostModalContext.Provider>
    );
};
