import "./Post.css"
import Avatar from '@material-ui/core/Avatar';
import { IconContext } from "react-icons";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import jwt from "../../generalized_functions/jwt"
import prettyDate from "../../generalized_functions/prettyDate";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { BiDetail } from "react-icons/bi";
import PostDetails from "../PostDetails/PostDetails";
import LikesList from "../LikesList/LikesList";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      maxWidth: 700,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2),
      marginRight: '10px',
      borderRadius:'5px',
      outline:"none"
    },
  }));

export default function Post(props) {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const decoded = jwt(token.token);
    const [liked, setLiked] = useState(props.post.likes.includes(decoded.uid));
    const [likes, setLikes] = useState(props.post.likes.length);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);

    const onProfileClick = () => {
        window.location = "/users/" + props.post.creator._id;
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

    const postDetailModalBody = (
        <div style={modalStyle} className={classes.paper}>
            <PostDetails post={props.post} liked={liked} />
            <button style={{ marginTop: "10px" }} className="Colored-button" onClick={onModalClose}>Close</button>
        </div>
    )

    const likesModalBody = (
        <div style={modalStyle} className={classes.paper}>
            <LikesList post={props.post}/>
            <button style={{ marginTop: "10px" }} className="Colored-button" onClick={onLikesModalClose}>Close</button>
        </div>
    )

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
                <Avatar onClick={onProfileClick} src={props.post.creator.profile_picture} alt={props.post.creator.username} style={{border:"1px solid rgb(240,240,240)"}}/>
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
                    <div className="Caption"><strong>{props.post.image?props.post.creator.username+": ":null}</strong>{props.post.caption}</div>
                    <div className="Post-clickable-items">
                        <div className="Likes-counter" onClick={onLikesModalOpen}>{likes} likes</div>
                        {liked ?
                            <AiFillHeart onClick={onHeartClick} style={{ color: "rgb(75, 35, 168)" }} /> :
                            <AiOutlineHeart onClick={onHeartClick} />
                        }

                        <BiDetail onClick={onModalOpen} style={{ fontSize: "22px" }} />

                    </div>
                    <div className="Post-date">
                        {prettyDate(props.post.created_at)}
                    </div>
                </IconContext.Provider>

            </div>

            <Modal
                open={isModalOpen}
                onClose={onModalClose}
                aria-labelledby="Post Details Modal"
                aria-describedby="Showing the details about the post!"
            >
                {postDetailModalBody}
            </Modal>

            <Modal
                open={isLikesModalOpen}
                onClose={onLikesModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {likesModalBody}
            </Modal>
        </div>
    )
}