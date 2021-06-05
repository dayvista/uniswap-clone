import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";

import "../styles/App.css";

const App = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/about" component={About} />
  </Switch>
);

export default App;
