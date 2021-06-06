import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Claim from "./Claim";
import Nav from "../components/Nav";
import BlockNumber from "../components/text/BlockNumber";

import "../styles/reset.css";
import "../styles/App.css";
import "@fontsource/ibm-plex-mono";
import "@fontsource/ibm-plex-mono/500.css";

const App = () => (
  <>
    <Nav />
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/claim" component={Claim} />
      <Redirect from="*" to="/" />
    </Switch>
    <BlockNumber />
  </>
);

export default App;
