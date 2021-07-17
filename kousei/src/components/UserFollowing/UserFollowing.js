import UserListCard from "../UserListCard/UserListCard";
import "./UserFollowing.css";
import UserHeader from "../UserHeader/UserHeader";

export default function UserFollowing(props){

    return(
        <div className="User-following">
            <div className="User-following-container">
                <UserHeader user={props.user} title="Following" close={props.handleClose} count={props.user.following.length}/>
                <div className="User-followers-list">
                    {props.user.following.map(user => (
                        <UserListCard key={user._id} user={user}/>
                    ))}
                </div>
            </div>
        </div>
    )
}