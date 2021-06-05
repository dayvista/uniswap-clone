import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Claim from "./Claim";
import Nav from "../components/Nav";

import "../styles/App.css";
import "@fontsource/ibm-plex-mono";

const App = () => (
  <>
    <Nav />
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/claim" component={Claim} />
    </Switch>
  </>
);

export default App;
