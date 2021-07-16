import "./Header.css";
import '../../Responsive.css'
import { useState, useEffect } from "react";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import jwt from "../../generalized_functions/jwt"

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

    const onHeaderClick = () => {
        window.location = "/dashboard";
    }
    return (
        <div className="Header">
            <div className="Header-left" onClick={onHeaderClick}>kousei</div>

            {loggedIn ?
                <div className="Header-right">
                    <button className="Colored-button" onClick={handleLogOut}>Log Out</button>
                    {user ?
                        <div className="Profile-picture-container Header-image">
                            <img className="Profile-picture" alt="User" src={user.profile_picture} />
                        </div> :
                        null
                    }

                </div>
                :
                <div className="Header-right">
                    <button className="Colored-button">Sing in</button>
                </div>

            }


        </div>
    )
}