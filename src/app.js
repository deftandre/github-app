"use strict";

import React, { Component } from "react";
import AppContent from "./components/app-content";
import ajax from "@fdaciuk/ajax";

class App extends Component {
    constructor() {
        super();
        this.state = {
            userinfo: null,
            repos: [],
            starred: [],
            isFetching: false,
        };
    }

    getGitHubApiUrl = (username, type) => {
        const internalUser = username ? `/${username}` : "";
        const internalType = type ? `/${type}` : "";
        return `https://api.github.com/users${internalUser}${internalType}`;
    };

    handleSearch = (e) => {
        const value = e.target.value;
        const key = e.key;

        if (key === "Enter") {
            this.setState({
                isFetching: true,
            });
            ajax()
                .get(this.getGitHubApiUrl(value))
                .then((result) => {
                    this.setState({
                        userinfo: {
                            username: result.name,
                            photo: result.avatar_url,
                            login: result.login,
                            repos: result.public_repos,
                            followers: result.followers,
                            following: result.following,
                        },
                    });
                })
                .catch(() => {
                    alert("Usuário não encontrado");
                })
                .always(() => {
                    this.setState({
                        isFetching: false,
                    });
                });
        }
    };

    getRepos = (type) => {
        return (e) => {
            const username = this.state.userinfo.login;
            ajax()
                .get(this.getGitHubApiUrl(username, type))
                .then((result) => {
                    this.setState({
                        [type]: result.map((repo) => {
                            return {
                                name: repo.name,
                                link: repo.html_url,
                            };
                        }),
                    });
                });
        };
    };

    render() {
        return (
            <AppContent
                {...this.state}
                handleSearch={(e) => this.handleSearch(e)}
                getRepos={this.getRepos("repos")}
                getStarred={this.getRepos("starred")}
            />
        );
    }
}

export default App;
