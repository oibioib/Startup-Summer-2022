const UserRepoDescription = ({description}) => {
    if (description) {
        return (
            <div className="repos-item_description">
                {description}
            </div>
        )
    }
}

const UserRepos = ({ data }) => {
    const { name, html_url, description } = data;

    return (
        <div className="repos-item">
            <a 
                href={html_url}
                className="repos-item_link"
                target="_blank"
                rel="noopener noreferrer">
                {name}
            </a>
            <UserRepoDescription description={description} />
        </div>
    );
};

export default UserRepos;