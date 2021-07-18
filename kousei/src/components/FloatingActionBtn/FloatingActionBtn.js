import "./FloatingActionBtn.css";
import {BiPaperPlane} from "react-icons/bi"
export default function FloatingActionBtn(props){
    return(
        <div className="Floating-action-btn" onClick={props.onClick}>
            <BiPaperPlane style={{fontSize:"27px", color:"white"}}/>
        </div>
    )
}