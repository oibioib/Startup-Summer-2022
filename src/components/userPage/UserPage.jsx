import { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import UserInfo from "../userInfo/UserInfo";
import UserRepos from "../userRepos/UserRepos";
import InfoMessage from "../infoMessage/InfoMessage";


const ShowRepos = (props) => {
    const { pageCount, allRepos } = props;
    return (
        <div className="user-info-repos_list">
            <h1>Repositories ({pageCount})</h1>
            {allRepos}
        </div>
    );
};

class UserPage extends Component {
    handlePageClick = (event) => {
        return this.props.doUpdatePage(event.selected + 1);
    };

    paginationSummaryAndIsShowLinks = (page, perPage, totalItems) => {
        const firstIndex = (page - 1) * perPage + 1;
        const maxIndex = page * perPage;
        const lastIndex = maxIndex <= totalItems ? maxIndex : totalItems;

        // Don't show pagination links if number of items less then limit per page. 
        const isPagination = totalItems > perPage;


        // Check if there is only one item on page, for show pagination summary like XX of XX
        if (firstIndex === lastIndex) {
            return [`${lastIndex} of ${totalItems}`, isPagination];
        }

        // Show pagination summary like Y - Z of XX
        return [`${firstIndex} - ${lastIndex} of ${totalItems}`, isPagination];
    };

    render() {
        const { user, userRepos, perPage, page } = this.props;

        const allRepos = userRepos.map(item => {
            const { id, ...data } = item;
            return (
                <UserRepos
                    key={id}
                    data={data} />
            );
        });

        const totalRepos = user.public_repos;

        const [paginationInfo, isPagination ] = this.paginationSummaryAndIsShowLinks(page, perPage, totalRepos);
        const paginationProp = {
            pageCount: Math.ceil(totalRepos / perPage),
            nextLabel: <FontAwesomeIcon icon={faChevronRight} />,
            previousLabel: <FontAwesomeIcon icon={faChevronLeft} />,
            marginPagesDisplayed: 1,
            pageRangeDisplayed: 3,
            onPageChange: this.handlePageClick
        };
        
        return (
            <>
                <UserInfo user={user}/>
                {!totalRepos && <InfoMessage reason="emptyuser"/>}
                {totalRepos > 0 &&
                    <div className="user-info-repos" >
                        <ShowRepos pageCount={totalRepos} allRepos={allRepos}/>
                        <div className="paginate">
                            <div className="paginate-summary">
                                {paginationInfo}
                            </div>
                            {isPagination && <ReactPaginate {...paginationProp}/>}
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default UserPage;