import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UserListCard from "../UserListCard/UserListCard";
import "./UserFollowers.css";
import Loading from "../Loading/Loading";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import UserHeader from "../UserHeader/UserHeader";

export default function UserFollowers(){
    const {id} = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser(){
            const res = await fetchDataWithAuth("/users/"+id, "GET");
            if(!res.data){
                alert(res.status);
            }
            else{
                setUser(res.data);
            }
        } 
        getUser();
    }, [id])

    if(!user){
        return(
            <Loading />
        )
    }

    

    return(
        <div className="User-followers">
            <div className="User-followers-container">
                <UserHeader user={user} title="Followers" count={user.followers.length}/>
                <div className="User-followers-list">
                    {user.followers.map(follower => (
                        <UserListCard key={follower._id} user={follower}/>
                    ))}
                </div>
            </div>
        </div>
    )
}