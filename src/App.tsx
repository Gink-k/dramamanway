import React from 'react';
import Dramamanway from './pages/dramamanway';
import { Container, Header, Menu } from './layout';
import HotkeyManager from './ui/hotkey-manger';

function App() {
    return (
        <HotkeyManager>
            <Container>
                <Header>
                    <Menu />
                </Header>
                <Dramamanway />
            </Container>
        </HotkeyManager>
    );
}

export default App;
