import "./Post.css"
import { IconContext } from "react-icons";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import jwt from "../../generalized_functions/jwt"
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { CgNotes } from "react-icons/cg";
import Modal from "react-modal";
import PostDetails from "../PostDetails/PostDetails";
import LikesList from "../LikesList/LikesList";

export default function Post(props) {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const decoded = jwt(token.token);
    const [liked, setLiked] = useState(props.post.likes.includes(decoded.uid));
    const [likes, setLikes] = useState(props.post.likes.length);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);
    Modal.setAppElement("#root");



    const onProfileClick = () => {
        window.location = "/user/" + props.post.creator._id;
    }

    const onModalOpen = () => {
        setIsModalOpen(true);
    }

    const onModalClose = () => {
        setIsModalOpen(false);
    }

    const onLikesModalOpen = () =>{
        setIsLikesModalOpen(true);
    }

    const onLikesModalClose = () => {
        setIsLikesModalOpen(false);
    }

    const onHeartClick = async () => {
        if (liked) {
            setLiked(false);
            const result = await fetchDataWithAuth("/posts/" + props.post._id + "/unlike", "PUT");
            if (result.data) {
                setLikes(result.data.likes.length)
            }

        }
        else {
            setLiked(true);
            const result = await fetchDataWithAuth("/posts/" + props.post._id + "/like", "PUT");
            if (result.data) {
                setLikes(result.data.likes.length)
            }
        }
    }

    return (
        <div className="Post">
            <div className="Post-header">
                <div className="Profile-picture-container">
                    <img onClick={onProfileClick} className="Profile-picture" src={props.post.creator.profile_picture} alt="Creator" />
                </div>
                <div className="Post-creator" onClick={onProfileClick}>
                    @{props.post.creator.username}
                </div>
            </div>
            {
                props.post.image ?
                    <div className="Post-content">
                        <img className="Post-image" src={props.post.image} alt="Post" />
                    </div> :
                    null
            }

            <div className="Post-footer">
                <IconContext.Provider value={{ className: "Post-icons" }}>
                    <div className="Caption"><strong>{props.post.creator.username}</strong>: {props.post.caption}</div>
                    <div className="Post-clickable-items">
                        <div className="Likes-counter" onClick={onLikesModalOpen}>{likes} likes</div>
                        {liked ?
                            <AiFillHeart onClick={onHeartClick} style={{ color: "rgb(75, 35, 168)" }} /> :
                            <AiOutlineHeart onClick={onHeartClick} />
                        }

                        <CgNotes onClick={onModalOpen} style={{ fontSize: "22px" }} />

                    </div>
                </IconContext.Provider>

            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={onModalClose}
                contentLabel="Example Modal"
                className="Modal"
                overlayClassName="Overlay"

            >
                <PostDetails post={props.post} onHeartClick={onHeartClick} liked={liked} />
                <button style={{ marginTop: "10px" }} className="Colored-button" onClick={onModalClose}>Close</button>
            </Modal>

            <Modal
                isOpen={isLikesModalOpen}
                onRequestClose={onLikesModalClose}
                contentLabel="Example Modal"
                className="Modal"
                overlayClassName="Overlay"

            >
                <LikesList post={props.post}/>
            </Modal>
        </div>
    )
}