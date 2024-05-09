import React from 'react';
import './styles.module.scss';
import Dramamanway from './pages/dramamanway';
import s from './styles.module.scss';
import { CatLogo } from './ui/icons';
function App() {
    return (
        <div className={s.app}>
            <div className={s.head}>
                <p className={s.logo}>
                    <CatLogo className={s.icon} size={64} fill={'orange'} />
                    По пути дорамщика
                </p>
            </div>
            <Dramamanway />
        </div>
    );
}

export default App;
