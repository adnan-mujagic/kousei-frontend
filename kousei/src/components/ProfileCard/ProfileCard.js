import "./ProfileCard.css";
import { useState, useEffect } from "react";
import Avatar from '@material-ui/core/Avatar';
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import jwt from "../../generalized_functions/jwt"

export default function ProfileCard(){
    const [user, setUser] = useState(null);
    const token = JSON.parse(sessionStorage.getItem("token"));
    const decoded = jwt(token.token);

    const handleProfileClick = () => {
        window.location = "/users/"+decoded.uid;
    }

    useEffect(() => {
        async function getUser(){
            
            const res = await fetchDataWithAuth("/users/"+ decoded.uid, "GET");
            if(!res.data){
                alert(res.status);
            }
            else{
                setUser(res.data);
            }
        }
        getUser();
    }, [decoded.uid])

    if(!user){
        return(
            <div>Loading...</div>
        )
    }

    return(
        <div className="Profile-card">
            <Avatar src={user.profile_picture} alt={user.username} style={{height:"52px", width:"52px"}}/>
            <div className="Profile-card-credentials">
                <h2>{user.full_name}</h2>
                <p onClick={handleProfileClick}>@{user.username}</p>
                <button className="Normal-button" style={{marginTop:"7px"}} onClick={handleProfileClick}>View Profile</button>
            </div>
            
        </div>
    )
}