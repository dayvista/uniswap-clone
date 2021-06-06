import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import store from "./lib/redux/store";
import { Provider } from "react-redux";

import App from "./App";

hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
