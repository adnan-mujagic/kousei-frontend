import "./ProfilePost.css";
import ProfilePostOverlay from "../ProfilePostOverlay/ProfilePostOverlay";

export default function ProfilePost(props){


    return(
        <div className="Profile-post">
            <ProfilePostOverlay post={props.post} />
            <img src={props.post.image} alt={props.post.caption}/>
        </div>
    )
}