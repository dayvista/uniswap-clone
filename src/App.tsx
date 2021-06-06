import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./routes/Home";
import Claim from "./routes/Claim";
import Nav from "./components/Nav";
import BlockNumber from "./components/text/BlockNumber";
import store from "./lib/redux/store";
import { Provider as ReduxProvider } from "react-redux";

import "./styles/reset.css";
import "./styles/App.css";
import "@fontsource/ibm-plex-mono";
import "@fontsource/ibm-plex-mono/500.css";

const App = () => (
  <ReduxProvider store={store}>
    <Nav />
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/claim" component={Claim} />
      <Redirect from="*" to="/" />
    </Switch>
    <BlockNumber />
  </ReduxProvider>
);

export default App;
