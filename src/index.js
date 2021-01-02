"use strict";

import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./app.js";

const renderApp = (NextApp) => {
    render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.querySelector('[data-js="app"]')
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept("./app.js", () => {
        const NextApp = require("./app").default;

        renderApp(NextApp);
    });
}
