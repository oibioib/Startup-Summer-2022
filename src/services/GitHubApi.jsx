class GitHubApi {
    _apiBase = 'https://api.github.com/users/';
    // _perPage = 4;

    getResource = async (url, params = {}) => {
        const query = Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&');

        // const urlWithParams = url + query ? '?':'' + query;
        const urlWithParams = url + '?' + query;

        const res = await fetch(urlWithParams);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getUserRepos = async (name, page, perPage) => {
        const repos = await this.getResource(`${this._apiBase}${name}/repos`, { per_page: perPage, page: page })
        return repos.map(this._prepareUserRepos);
    };

    _prepareUserRepos = (userRepos) => {
        return {
            id: userRepos.id,
            name: userRepos.name,
            html_url: userRepos.html_url,
            description: userRepos.description
        };
    };

    getUser = async (name) => {
        console.log(`${this._apiBase}${name}`);
        const data = await this.getResource(`${this._apiBase}${name}`);
        return this._prepareUser(data);
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