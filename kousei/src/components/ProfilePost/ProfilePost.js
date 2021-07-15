import "./ProfilePost.css";

export default function ProfilePost(props){


    return(
        <div className="Profile-post">
            <img src={props.post.image} alt={props.post.caption}/>
        </div>
    )
}