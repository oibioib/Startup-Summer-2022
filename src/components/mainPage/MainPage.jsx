import UserPage from "../userPage/UserPage";
import InfoMessage from "../infoMessage/InfoMessage";

import Spinner from "../spinner/Spinner";

const MainPage = ({ data, doUpdatePage }) => {
    const { searchStr, userRepos, user, loading } = data;

    if (searchStr && loading) {
        return <Spinner/>
    }

    return (
        <>
            {  
                (!searchStr &&
                    <InfoMessage
                        reason="initial" />) ||
                (user && userRepos &&
                    <UserPage
                        {...data}
                        doUpdatePage={(selectedPage) => doUpdatePage(selectedPage)} />) ||

                (!user &&
                    <InfoMessage
                        reason="usernotfound" />)
            }
        </>
    );
};

export default MainPage;