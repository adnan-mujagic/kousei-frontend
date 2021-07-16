import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UserListCard from "../UserListCard/UserListCard";
import "./UserFollowing.css";
import Loading from "../Loading/Loading";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import UserHeader from "../UserHeader/UserHeader";

export default function UserFollowing(){
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
        <div className="User-following">
            <div className="User-following-container">
                <UserHeader user={user} title="Following" count={user.following.length}/>
                <div className="User-followers-list">
                    {user.following.map(user => (
                        <UserListCard key={user._id} user={user}/>
                    ))}
                </div>
            </div>
        </div>
    )
}