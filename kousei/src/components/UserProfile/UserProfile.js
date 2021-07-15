import { useParams } from "react-router-dom";
import "./UserProfile.css";
import { useState, useEffect } from "react";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import Loading from "../Loading/Loading";
import ProfilePost from "../ProfilePost/ProfilePost";
import UserProfileOrderPicker from "../UserProfileOrderPicker/UserProfileOrderPicker";
import {BiBook, BiUserCircle, BiGridAlt, BiEnvelope} from "react-icons/bi";
import { IconContext } from "react-icons/lib";

export default function UserProfile(props){
    const {id} = useParams();

    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState(null);
    const [order, setOrder] = useState("normal")

    useEffect(() => {
        async function getUser(){
            let user = await fetchDataWithAuth("/users/"+id, "GET");
            if(!user.data){
                alert(user.status);
            }
            
            else{
                setUser(user.data);
            }
        }
        getUser();
    }, [id])

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
                        <ProfilePost post = {post} />
                    ))}
                </div>
            </div>:
            <Loading />
            }
        </div>
    )
}