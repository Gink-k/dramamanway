import React from 'react';
import Dramamanway from './pages/dramamanway';
import { Container, Header, Menu } from './layout';

function App() {
    return (
        <Container>
            <Header>
                <Menu />
            </Header>
            <Dramamanway />
        </Container>
    );
}

export default App;
