import React, { StrictMode } from 'react';

import CoreApp from "./Components/CoreApp"
import Navbar from "./Components/Navbar";

function App() {
    return (
        <StrictMode>
            <div className="App">
                <Navbar />
                <CoreApp />
            </div>
        </StrictMode>
    );
}

export default App;
