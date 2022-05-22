import { ReactComponent as Initial } from '../../images/search-big-ico.svg';
import { ReactComponent as User } from '../../images/user-ico.svg';
import { ReactComponent as EmptyUser } from '../../images/userempty-ico.svg';


const InfoMessage = ({ reason, loading }) => {
    const _baseImagesPath = {
        initial: {
            img: <Initial />,
            text: 'Start with searching a GitHub user'
        },
        usernotfound: {
            img: <User />,
            text: 'User not Found'
        },
        emptyuser: {
            img: <EmptyUser />,
            text: 'Repository list is empty'
        },
    };

    return (
        <div className="info-message">
            {_baseImagesPath[reason].img}
            <span className="info-message_text">
                {_baseImagesPath[reason].text}
            </span>
        </div>
    );
};

export default InfoMessage;