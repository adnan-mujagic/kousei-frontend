import "./OrderPicker.css";
import { IconContext } from "react-icons";
import { useState } from "react";
import {AiOutlineFieldTime, AiOutlineHeart, AiOutlineFire} from "react-icons/ai";

export default function OrderPicker(props){

    const [order, setOrder] = useState("normal");

    const handleTimeClick = () => {
        setOrder("normal");
        props.setOrder("normal");
    }

    const handleHeartClick = () => {
        setOrder("likes");
        props.setOrder("likes");
    }

    const handleFireClick = () => {
        setOrder("popularity");
        props.setOrder("popularity");
    }
    return(
        <IconContext.Provider value={{className:"Order-picker-icon"}}>
            <div className="Order-picker">
                <AiOutlineFieldTime style={{color:order==="normal"?"purple":null}} onClick={handleTimeClick}/>
                <AiOutlineHeart style={{color:order==="likes"?"purple":null}} onClick={handleHeartClick}/>
                <AiOutlineFire style={{color:order==="popularity"?"purple":null}} onClick={handleFireClick}/>
            </div>
        </IconContext.Provider>
    )
}