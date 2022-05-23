import { Octokit } from "octokit";
    
    
class GitHubApi {
    
    getResource = async (url, params = {}) => {
        // https://stackoverflow.com/questions/49579028/adding-an-env-file-to-react-project
        // https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
        const _API_KEY = process.env.REACT_APP_GITHUB_API_TOKEN;
        const octokit = new Octokit({
            auth: _API_KEY,
        });
        const res = await octokit.request(url, params);
        return await res.data;
    };

    getUserRepos = async (username, page, perPage) => {
        const reposData = await this.getResource(`GET /users/{username}/repos`, { username: username, per_page: perPage, page: page })
        return reposData.map(this._prepareUserRepos);
    };

    _prepareUserRepos = (userRepos) => {
        return {
            id: userRepos.id,
            name: userRepos.name,
            html_url: userRepos.html_url,
            description: userRepos.description
        };
    };

    getUser = async (username) => {
        const userData = await this.getResource(`GET /users/{username}`, {username: username});
        return this._prepareUser(userData);
    };

    _prepareUser = (userData) => {
        return {
            login: userData.login,
            name: userData.name,
            html_url: userData.html_url,
            public_repos: userData.public_repos,
            avatar_url: userData.avatar_url,
            followers: userData.followers,
            following: userData.following,
        };
    };
}

export default GitHubApi;