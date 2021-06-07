import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Claim from "./Claim";
import Nav from "../components/Nav";
import BlockNumber from "../components/text/BlockNumber";
import store from "../lib/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import {
  Web3Provider,
  ExternalProvider,
  JsonRpcFetchFunc,
} from "@ethersproject/providers";

import "../styles/reset.css";
import "../styles/App.css";
import "@fontsource/ibm-plex-mono";
import "@fontsource/ibm-plex-mono/500.css";

const getLibrary = (
  provider: ExternalProvider | JsonRpcFetchFunc
): Web3Provider => {
  const library = new Web3Provider(provider);

  library.pollingInterval = 12000;

  return library;
};

const App = () => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <ReduxProvider store={store}>
      <Nav />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/claim" component={Claim} />
        <Redirect from="*" to="/" />
      </Switch>
      <BlockNumber />
    </ReduxProvider>
  </Web3ReactProvider>
);

export default App;
