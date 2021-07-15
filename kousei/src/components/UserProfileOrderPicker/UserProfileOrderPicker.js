import "./UserProfileOrderPicker.css";
import { IconContext } from "react-icons/lib";
import {BiTimeFive, BiHeart, BiLineChart} from "react-icons/bi"
import { useState } from "react";

export default function UserProfileOrderPicker(props){
    const [order, setOrder] = useState("normal")

    const onNormalClick = () => {
        setOrder("normal");
        props.setOrder("normal");
    }

    const onHeartClick = () => {
        setOrder("likes");
        props.setOrder("likes");
    }

    const onChartClick = () => {
        setOrder("popularity");
        props.setOrder("popularity");
    }

    return(
        <IconContext.Provider value={{className:"User-profile-order-picker-icon"}}>
            <div className="User-profile-order-picker">
                <div onClick={onNormalClick} className="Order-item" style={{borderBottom:order==="normal"?"2px solid rgb(255, 105, 51)":null}}><div className="Order-item-icon-wrapper"><BiTimeFive /></div>Recent</div>
                <div onClick={onHeartClick} className="Order-item" style={{borderBottom:order==="likes"?"2px solid rgb(255, 105, 51)":null}}><div className="Order-item-icon-wrapper"><BiHeart /></div>Most Liked</div>
                <div onClick={onChartClick} className="Order-item" style={{borderBottom:order==="popularity"?"2px solid rgb(255, 105, 51)":null}}><div className="Order-item-icon-wrapper"><BiLineChart /></div>Popular</div>
            </div>
        </IconContext.Provider>
    )
}