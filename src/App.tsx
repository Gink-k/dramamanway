import React, {useEffect} from 'react';
import './App.css';
import {useStore} from "./hooks";
import {parseDramamanwayPost} from "./lib";
import Dramamanway from "./pages/dramamanway";

function App() {
    // const fetchPage = useStore(state => state.fetchDramamanwayPosts);

    return (
        <div className="App">
            <Dramamanway/>
        </div>
    );
}

export default App;
