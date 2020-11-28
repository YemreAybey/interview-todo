import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Flex } from "rebass";
import App from "./App";
import { store } from "./store";

const Loader = () => {
  <Flex width={1} height={1} justifyContent="center" alignItems="center">
    <img
      alt="Loader"
      src="//s.svgbox.net/loaders.svg?fill=805ad5#puff"
      width="100px"
      height="100px"
    />
  </Flex>;
};

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);
