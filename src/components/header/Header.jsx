import { Component } from 'react';

import { ReactComponent as Logo } from '../../images/github-logo.svg';
import { ReactComponent as SearchIco } from '../../images/search-ico.svg';

class Header extends Component {
    doSearch = (e) => {
        if (e.key === "Enter") {
            const searchStr = e.target.value;
            this.props.doSearch(searchStr);
        }
    };

    render () {
        return (
            <div className="header">
                <div className="header-wrapper">
                    <span className="header-logo">
                        <Logo />
                    </span>
                    <div className="header-search">
                        <span className="header-search-icon">
                            <SearchIco />
                        </span>
                        <div className="header-search_input">
                        <input
                            onKeyDown={this.doSearch}
                            type="text"
                            placeholder="Enter GitHub username"
                        />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;