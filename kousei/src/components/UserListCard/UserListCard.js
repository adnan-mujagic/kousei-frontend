import "./UserListCard.css";

export default function UserListCard(props){
    return(
        <div className="User-list-card">
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