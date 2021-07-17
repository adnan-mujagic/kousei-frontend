import UserListCard from "../UserListCard/UserListCard";
import "./UserFollowers.css";
import UserHeader from "../UserHeader/UserHeader";

export default function UserFollowers(props){
    return(
        <div className="User-followers">
            <UserHeader user={props.user} close={props.handleClose} title="Followers" count={props.user.followers.length}/>
            <div className="User-followers-list">
                {props.user.followers.map(follower => (
                    <UserListCard key={follower._id} user={follower}/>
                ))}
            </div>
        </div>
    )
}