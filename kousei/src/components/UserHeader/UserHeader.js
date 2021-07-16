import "./UserHeader.css";
import {BiArrowBack} from "react-icons/bi";
export default function UserHeader(props){

    const onBackClick = () => {
        window.location = "/users/"+props.user._id;
    }

    return(
        <div className="User-header">
            <div className="User-header-title"><BiArrowBack onClick={onBackClick} className="Back-icon"/>{props.title}</div>
            <div className="User-header-main">
                <div className="Profile-picture-container" style={{height:"150px", width:"150px"}}>
                    <img className="Profile-picture" src={props.user.profile_picture} alt={props.user.full_name}/>
                </div>
                <div className="User-details">
                    <div className="User-header-full-name">{props.user.full_name}</div>
                    <div className="User-header-username">@{props.user.username}</div>
                    <div className="Data-count">{props.title}: {props.count}</div>
                </div>
            </div>
            
        </div>
        
    )
}