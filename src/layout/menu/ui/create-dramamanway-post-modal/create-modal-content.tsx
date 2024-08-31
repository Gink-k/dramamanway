import { FC } from 'react';
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
import { useNewDramamanwayPost } from '../../hooks';

type CreateModalContentProps = {};

export const CreateModalContent: FC<CreateModalContentProps> = ({}) => {
    const [dramamanwayPost, setDramamanwayPost] = useNewDramamanwayPost();

    return (
        <createDramamanwayPostModalContext.Provider value={{ dramamanwayPost, setDramamanwayPost }}>
            <div className={s.createModalContainer}>
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
                {/*<Feedback />*/}
                {/*<NegativeAspects />*/}
                <Footer />
            </div>
        </createDramamanwayPostModalContext.Provider>
    );
};
