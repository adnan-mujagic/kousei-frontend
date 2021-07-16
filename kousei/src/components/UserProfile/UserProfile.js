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

const token = JSON.parse(sessionStorage.getItem("token"));
let loggedInUser = null;
if(token){
    loggedInUser = jwt(token.token);
}

const isFollowed = (followers) => {
    console.log(followers);
    if(!loggedInUser){
        return false;
    }
    else if(followers.includes(loggedInUser.uid)){
        return true;
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

    
    if(!user){
        return(
            <Loading />
        )
    }

    return (
        <div className="User-profile">
            <div className="User-profile-left">
                <div className="Profile-picture-container" style={{height:"200px", width:"200px", marginLeft:"0px"}}>
                    <img className="Profile-picture" src={user.profile_picture} alt={user.username}/>
                </div>
                <IconContext.Provider value={{className:"User-info-icons"}}>
                    <div className="User-profile-information">
                        <div className="User-profile-full-name">{user.full_name}</div>
                        <div className="User-profile-username">@{user.username}</div>
                        {!loading && isOwner?
                            null:
                            <div>
                                {following?<div className="Profile-button" onClick={onUnfollowClick}>Unfollow</div>:<div className="Profile-button" onClick={onFollowClick}>Follow</div>}
                            </div>
                        }

                        
                        
                        <div className="User-profile-follow-data"><div className="user-info-icon-wrapper"><BiUserCircle/></div>{user.followers.length} followers</div>
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
        </div>
    )
}