import React from 'react';

import Graphs from "./Components/Graphs"
import Navbar from "./Components/Navbar";

import TestGraph from "./Components/TestGraph";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Graphs/>
            {/* <TestGraph/> */}
        </div>
    );
}

export default App;
