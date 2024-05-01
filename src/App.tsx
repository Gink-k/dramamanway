import React, {useEffect} from 'react';
import './App.css';
import {useStore} from "./hooks";

function App() {
  const fetchPage = useStore(state => state.fetchPage);

  return (
    <div className="App">
      <button onClick={() => fetchPage()}>fetch</button>
    </div>
  );
}

export default App;
