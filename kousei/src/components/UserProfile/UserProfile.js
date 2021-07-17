import { useParams } from "react-router-dom";
import "./UserProfile.css";
import { useState, useEffect } from "react";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import Loading from "../Loading/Loading";
import ProfilePost from "../ProfilePost/ProfilePost";
import UserProfileOrderPicker from "../UserProfileOrderPicker/UserProfileOrderPicker";
import {BiBook, BiUserCircle, BiGridAlt, BiEnvelope} from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import jwt from "./../../generalized_functions/jwt"
import { Avatar, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import UserFollowers from "../UserFollowers/UserFollowers";
import UserFollowing from "../UserFollowing/UserFollowing";

const token = JSON.parse(sessionStorage.getItem("token"));
let loggedInUser = null;
if(token){
    loggedInUser = jwt(token.token);
}

const useStyles = makeStyles((theme) => ({
    root:{
        boxShadow: theme.shadows[5],
        position:"absolute",
        borderRadius:"5px",
        background:theme.palette.background.paper,
        maxWidth:"500px",
        marginRight:"10px"
    }
}))

const isFollowed = (followers) => {
    
    if(!loggedInUser){
        return false;
    }
    
    for(let i=0; i<followers.length; i++){
        console.log(followers[i])
        if(followers[i]._id === loggedInUser.uid){
            return true;
        }
    }
    
    return false;
}

const checkOwner = (userId) => {
    if(loggedInUser){
        return loggedInUser.uid===userId;
    }
}

export default function UserProfile(props){
    const {id} = useParams();
    
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState(null);
    const [order, setOrder] = useState("normal")
    const [following, setFollowing] = useState(null)
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true);

    //MODAL DATA HERE!
    const classes = useStyles();
    const [followerModalOpen, setFollowerModalOpen] = useState(false);
    const [followingModalOpen, setFollowingModalOpen] = useState(false);

    const onFollowClick = async () => {
        const res = await fetchDataWithAuth("/users/"+id+"/followers", "PUT");
        if(!res.data){
            alert(res.status);
        }
        else{
            setFollowing(true);
            setUser(res.data);
        }
    }

    const onUnfollowClick = async () => {
        const res = await fetchDataWithAuth("/users/"+id+"/unfollow", "PUT");
        if(!res.data){
            alert(res.status);
        }
        else{
            setFollowing(false);
            setUser(res.data);
        }
    }

    useEffect(() => {
        async function getUser(){
            let retrievedUser = await fetchDataWithAuth("/users/"+id, "GET");
            if(!retrievedUser.data){
                alert(retrievedUser.status);
            }
            
            else{
                setUser(retrievedUser.data);
                setIsOwner(checkOwner(retrievedUser.data._id));
                if(!isOwner){
                    setFollowing(isFollowed(retrievedUser.data.followers));
                }
                setLoading(false);
            }
        }
        getUser();
    }, [id, isOwner])

    useEffect(() => {
        async function getPosts(){
            const posts = await fetchDataWithAuth("/users/"+id+"/posts?order="+order);
            if(!posts.data){
                alert(posts.status);
            }
            else{
                setUserPosts(posts.data);
            }
        }
        getPosts()
    }, [id, order, setOrder])

    const onFollowersClick = () => {
        setFollowerModalOpen(true);
    }

    const handlefollowerModalClose = () =>{
        setFollowerModalOpen(false);
    }

    const onFollowingClick = () => {
        setFollowingModalOpen(true);
    }

    const handlefollowingModalClose = () =>{
        setFollowingModalOpen(false);
    }

    const positionModal = {
        top:"50%",
        left:"50%",
        transform: "translate(-50%,-50%)",
    }
    
    if(!user){
        return(
            <Loading />
        )
    }

    const followerModalBody = (
        <div className={classes.root} style={positionModal}>
            <UserFollowers user_id={user._id} handleClose={handlefollowerModalClose}/>
        </div>
    )

    const followingModalBody = (
        <div className={classes.root} style={positionModal}>
            <UserFollowing user_id={user._id} handleClose={handlefollowingModalClose}/>
        </div>
    )

    return (
        <div className="User-profile">
            <div className="User-profile-left">
                <Avatar src={user.profile_picture} alt={user.username} style={{width:"200px", height:"200px"}}/>
                <IconContext.Provider value={{className:"User-info-icons"}}>
                    <div className="User-profile-information">
                        <div className="User-profile-full-name">{user.full_name}</div>
                        <div className="User-profile-username">@{user.username}</div>
                        {!loading && isOwner?
                            null:
                            <div>
                                {following?<button className="Profile-button" onClick={onUnfollowClick}>Unfollow</button>:<button className="Profile-button" onClick={onFollowClick}>Follow</button>}
                            </div>
                        }

                        
                        
                        <div className="User-profile-follow-data">
                            <div className="user-info-icon-wrapper"><BiUserCircle/></div>
                            <button onClick={onFollowersClick}>{user.followers.length} followers, </button>
                            <button onClick={onFollowingClick}>{user.following.length} following</button>
                        </div>
                        {userPosts?
                            <div className="User-profile-posts-data"><div className="user-info-icon-wrapper"><BiGridAlt /></div>{userPosts.length} posts</div>:
                            null
                        }
                        {user.email?
                            <div className="User-profile-posts-data"><div className="user-info-icon-wrapper"><BiEnvelope /></div>{user.email}</div>:
                            null
                        }
                        {user.bio?
                            <div className="User-profile-bio"><div className="user-info-icon-wrapper"><BiBook/></div>{user.bio}</div>:
                            null
                        }
                    </div>
                </IconContext.Provider>
            </div>
            {userPosts?
                <div className="User-profile-right">
                <UserProfileOrderPicker setOrder={setOrder}/>
                <div className="User-profile-post-container">
                    {userPosts.length===0?<div>This user has no posts yet!</div>:
                    userPosts.map(post => (
                        <ProfilePost key={post._id} post = {post} user = {user} />
                    ))}
                </div>
            </div>:
            <Loading />
            }

            <Modal
                open={followerModalOpen}
                onClose={handlefollowerModalClose}
                aria-labelledby="Follower Modal"
                aria-describedby="This modal shows a list of user followers"
            >
                {followerModalBody}
            </Modal>

            <Modal
                open={followingModalOpen}
                onClose={handlefollowingModalClose}
                aria-labelledby="Following Modal"
                aria-describedby="This modal shows a list of user following!"
            >
                {followingModalBody}
            </Modal>
        </div>
    )
}