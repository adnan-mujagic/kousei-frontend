import "./UserHeader.css";
import {BiArrowBack} from "react-icons/bi";
import { Avatar } from "@material-ui/core";
export default function UserHeader(props){

    const pictureStyle = {
        height:"150px",
        width:"150px",
    }

    return(
        <div className="User-header">
            <div className="User-header-title"><BiArrowBack onClick={props.close} className="Back-icon"/>{props.title}</div>
            <div className="User-header-main">
                <Avatar src={props.user.profile_picture} alt={props.user.username} style={pictureStyle}/>
                <div className="User-details">
                    <div className="User-header-full-name">{props.user.full_name}</div>
                    <div className="User-header-username">@{props.user.username}</div>
                    <div className="Data-count">{props.title}: {props.count}</div>
                </div>
            </div>
            
        </div>
        
    )
}