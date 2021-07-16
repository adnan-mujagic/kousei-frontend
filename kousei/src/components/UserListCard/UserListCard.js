import "./UserListCard.css";

export default function UserListCard(props){
    const onUserClick = () => {
        window.location = "/users/"+props.user._id;
    }

    return(
        <div className="User-list-card" onClick={onUserClick}>
            <div className="Profile-picture-container" style={{marginLeft:"0px"}}>
                <img className="Profile-picture" src={props.user.profile_picture} alt={props.user.username}/>
            </div>
            <div className="User-list-card-credentials">
                <div className="User-list-card-full-name">{props.user.full_name}</div>
                <div className="User-list-card-username">@{props.user.username}</div>
            </div>
        </div>
    )
}