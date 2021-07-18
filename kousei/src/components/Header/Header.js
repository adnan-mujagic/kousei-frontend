import "./Header.css";
import '../../Responsive.css'
import { useState, useEffect } from "react";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import Avatar from '@material-ui/core/Avatar';
import jwt from "../../generalized_functions/jwt"
import { Button } from "@material-ui/core";

export default function Header() {
    const [loggedIn] = useState(sessionStorage.getItem("token") ? true : false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function getUserData() {
            const token = JSON.parse(sessionStorage.getItem("token"));
            const decoded = jwt(token.token);
            const result = await fetchDataWithAuth("/users/" + decoded.uid, "GET");
            setUser(result.data);
        }
        if (loggedIn) {
            getUserData();
        }
    }, [loggedIn])

    const handleLogOut = () => {
        sessionStorage.removeItem("token");
        window.location = "/login";
    }

    const onProfileImageClick = () => {
        window.location = "/users/"+user._id;
    }

    const onHeaderClick = () => {
        window.location = "/dashboard";
    }
    return (
        <div className="Header">
            <div className="Header-left"><button onClick={onHeaderClick}>kousei</button></div>

            {loggedIn ?
                <div className="Header-right">
                    <Button color="secondary" onClick={handleLogOut}>Log Out</Button>
                    {user ?
                        <Avatar src={user.profile_picture} alt={user.username} onClick={onProfileImageClick} style={{border:"1px solid rgb(240,240,240)",marginLeft:"16px", height:"30px", width:"30px"}}/> :
                        null
                    }

                </div>
                :
                <div className="Header-right">
                    <Button color="secondary">Log In</Button>
                </div>

            }


        </div>
    )
}