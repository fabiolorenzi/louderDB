import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home.jsx";

function App() {
    return(
        <div className="app">
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </div>
    );
};

export default App;