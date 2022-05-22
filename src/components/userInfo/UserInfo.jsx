import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faUser } from "@fortawesome/free-solid-svg-icons";


const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'k';
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num < 900) {
        return num;
    }
};

const UserInfo = ({ user }) => {
    const { login, name, html_url, avatar_url, followers, following } = user;

    const formatFollowers = numFormatter(followers);
    const formatFollowing = numFormatter(following);

    return (
        <div className="user-info">
            <img
                className="user-info_img"
                src={avatar_url}
                alt={login} />
            <span
                className="user-info_name">
                {name}
            </span>
            <a
                className="user-info_link"
                href={html_url}
                target="_blank"
                rel="noopener noreferrer">
                {login}
            </a>
            <div className="user-info_followers">
                <span>
                    <FontAwesomeIcon icon={faUserGroup} className="ico" />{formatFollowers} followers
                </span>
                <span>
                    <FontAwesomeIcon icon={faUser} className="ico" />{formatFollowing} following
                </span>
            </div>
        </div>
    );
};

export default UserInfo;