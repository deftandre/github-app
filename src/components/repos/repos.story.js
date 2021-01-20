"use strict";

import React from "react";
import { storiesOf } from "@kadira/storybook";
import Repos from "./index";

const stories = storiesOf("Repos", module);

stories.add("with title prop", () => <Repos title={"Favoritos"} />);

stories.add("with repos", () => (
    <Repos
        title="Favoritos"
        repos={[
            {
                link:
                    "https://github.com/thedaviddias/Front-End-Performance-Checklist",
                name: "Front-End Performance Checklist",
            },
        ]}
    />
));
