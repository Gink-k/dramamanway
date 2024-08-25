import { FC, useState } from 'react';
import { DramamanwayPostUtils } from '../../../../lib';
import { usePersistDramamanwayPost } from '../../../../hooks';
import s from './styles.module.scss';
import { Caste } from './caste';
import { Score } from './score';
import { Footer } from './footer';
import { Info } from './info';
import { createDramamanwayPostModalContext } from '../../lib';
import { Header } from './header';
import { About } from './about';
import { Idea } from './idea';
import { Recommendation } from './recommendation';
import { Feedback } from './feedback';
import { NegativeAspects } from './negativeAspects';

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
                <div className={s.main}>
                    <Header />
                    <Info />
                    <Caste />
                    <About />
                    <Idea />
                    <Score />
                    <Recommendation />
                    <Feedback />
                    <NegativeAspects />
                    <Footer />
                </div>
            </div>
        </createDramamanwayPostModalContext.Provider>
    );
};
