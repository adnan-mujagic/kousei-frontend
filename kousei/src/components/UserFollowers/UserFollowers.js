import UserListCard from "../UserListCard/UserListCard";
import "./UserFollowers.css";
import UserHeader from "../UserHeader/UserHeader";
import { useState, useEffect } from "react";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import Loading from "../Loading/Loading";
import EmptyContent from "../EmptyContent/EmptyContent";

export default function UserFollowers(props){
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUser(){
            const res = await fetchDataWithAuth("/users/"+props.user_id,"GET");
            if(!res.data){
                alert(res.status);
            }
            else{
                setUser(res.data);
                setLoading(false);
            }
        }
        getUser();
    }, [props.user_id])

    if(loading || !user){
        return(
            <Loading/>
        )
    }

    return(
        <div className="User-followers">
            <UserHeader user={user} close={props.handleClose} title="Followers" count={user.followers.length}/>
            {user.followers.length>0?
                <div className="User-followers-list">
                    {user.followers.map(follower => (
                        <UserListCard key={follower._id} user={follower}/>
                    ))}
                </div>:
                <EmptyContent />
            }
            
        </div>
    )
}