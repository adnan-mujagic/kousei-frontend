import "./ProfilePostOverlay.css";
import { IconContext } from "react-icons/lib";
import {BiHeart} from "react-icons/bi";

export default function ProfilePostOverlay(props){
    return(
        <IconContext.Provider value={{className:"Post-overlay-icons"}}>
        <div className="Profile-post-overlay">
            <div><BiHeart /> {props.post.likes.length}</div>
        </div>
        </IconContext.Provider>
    )
}