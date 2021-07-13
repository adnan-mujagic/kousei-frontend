import "./PostDetails.css"
import jwt from "../../generalized_functions/jwt"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { IconContext } from "react-icons";
import Comment from "../Comment/Comment";
import CreateComment from "../CreateComment/CreateComment";
import { useState, useEffect } from "react";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";

export default function PostDetails(props) {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const decoded = jwt(token.token);
    const [liked, setLiked] = useState(null);
    const [likes, setLikes] = useState(null);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        async function getPost() {
            const result = await fetchDataWithAuth("/posts/" + props.post._id, "GET");
            const comments = await fetchDataWithAuth("/posts/" + props.post._id + "/comments", "GET");
            setComments(comments.data)
            setPost(result.data);
            setLiked(result.data.likes.includes(decoded.uid));
            setLikes(result.data.likes.length);
        }
        getPost();
    }, [decoded.uid, props.post._id, liked])


    const onLike = async () => {
        if (liked) {
            await fetchDataWithAuth("/posts/" + props.post._id + "/unlike", "PUT");
            setLiked(false);
        }
        else {
            await fetchDataWithAuth("/posts/" + props.post._id + "/like", "PUT");
            setLiked(true);
        }
    }
    if (!post) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div className="Post-details">
            <div className="Post-details-left">
                <div className="Post-details-header">
                    <div className="Profile-picture-container">
                        <img className="Profile-picture" alt="Creator" src={post.creator.profile_picture} />
                    </div>
                    <div className="Post-details-username">@{post.creator.username}</div>
                </div>
                {post.image ?
                    <div className="Post-details-image-container">
                        <img className="Post-details-image" src={post.image} alt="Post" />
                    </div> :
                    null
                }
                <IconContext.Provider value={{ className: "Post-icons" }}>
                    <div className="post-details-clickable-items">
                        <div className="Likes-counter">{likes} likes</div>
                        {liked ?
                            <AiFillHeart onClick={onLike} /> :
                            <AiOutlineHeart onClick={onLike} />
                        }
                    </div>
                    <div className="Post-details-caption">{post.creator.username}: {post.caption}</div>
                </IconContext.Provider>
            </div>
            <div className="Post-details-right">
                <div style={{ padding: "5px" }}>Comments</div>
                <CreateComment post={post} setComments={setComments} />
                <div className="comments">
                    {comments.map(comment => (
                        <Comment key={comment._id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    )

}