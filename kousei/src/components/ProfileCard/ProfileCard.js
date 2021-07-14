import "./ProfileCard.css";
import { useState, useEffect } from "react";
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
            
            <div className="Profile-card-image" onClick={handleProfileClick}>
                <img src={user.profile_picture} alt="Logged in User"/>
            </div>
            <div className="Profile-card-credentials">
                <h2>{user.full_name}</h2>
                <p onClick={handleProfileClick}>@{user.username}</p>
                <button className="Normal-button" onClick={handleProfileClick}>View Profile</button>
            </div>
            
        </div>
    )
}