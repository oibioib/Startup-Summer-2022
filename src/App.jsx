import { Component } from 'react';

import GitHubApi from './services/GitHubApi';
import Header from './components/header/Header';
import MainPage from './components/mainPage/MainPage';

import './app.css';


class App extends Component {
    state = {
        searchStr: '',
        user: null,
        userRepos: null,
        page: 1,
        perPage: 4,
        loading: true
    };

    gitHubApi = new GitHubApi();

    getUser = (searchStr) => {
        this.gitHubApi
            .getUser(searchStr)
            .then((data) => {
                this.setState((state) => ({
                    user: data,
                    loading: false
                }));
            })
            .then(() => {
                this.getUserRepos(searchStr, this.state.page, this.state.perPage);
            })
            .catch((e) => {
                this.setState((state) => ({
                    user: null,
                    loading: false
                }));
            });
    };

    getUserRepos = (searchStr, page, perPage) => {
        this.gitHubApi
            .getUserRepos(searchStr, page, perPage)
            .then((data) => {
                this.setState({
                    userRepos: data,
                    loading: false
                });
            })
            .catch((e) => {
                this.setState((state) => ({
                    userRepos: null,
                    loading: false
                }));
            });
    };

    doSearch = async (searchStr) => {
        this.setState((state) => ({
            searchStr,
            user: null,
            userRepos: null,
            page: 1,
            loading: true
        }));

        this.getUser(searchStr);
    };

    doUpdatePage = (page) => {
        this.setState((state) => ({
            page: page
        }));
        this.getUserRepos(this.state.searchStr, page, this.state.perPage);
    };

    render() {
        return (
            <>
                <Header doSearch={this.doSearch} />
                <div className={(this.state.user && !this.state.loading && 'content f-column') || 'content'}>
                    <MainPage
                        data={this.state}
                        doUpdatePage={(selectedPage) => this.doUpdatePage(selectedPage)} />
                </div>

            </>
        );
    }
}
export default App;