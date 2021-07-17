import UserListCard from "../UserListCard/UserListCard";
import "./UserFollowing.css";
import UserHeader from "../UserHeader/UserHeader";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import Loading from "../Loading/Loading";
import { useState, useEffect } from "react";

export default function UserFollowing(props){

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
        <div className="User-following">
            <div className="User-following-container">
                <UserHeader user={user} title="Following" close={props.handleClose} count={user.following.length}/>
                <div className="User-followers-list">
                    {user.following.map(user => (
                        <UserListCard key={user._id} user={user}/>
                    ))}
                </div>
            </div>
        </div>
    )
}