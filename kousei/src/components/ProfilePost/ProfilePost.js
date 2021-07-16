import "./ProfilePost.css";
import ProfilePostOverlay from "../ProfilePostOverlay/ProfilePostOverlay";

export default function ProfilePost(props){

    return(
        <div className="Profile-post">
            <ProfilePostOverlay post={props.post} />
            {props.post.image?<img src={props.post.image} alt={props.post.caption}/>:
                <div className="No-image-post-wrapper">
                    <div className="No-image-post">{props.post.caption}</div>
                    <div className="No-image-post-signature">-{props.user.username}</div>
                </div>
            }
            
        </div>
    )
}