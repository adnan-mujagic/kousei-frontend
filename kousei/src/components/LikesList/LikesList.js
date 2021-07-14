import "./LikesList.css";
import { useState, useEffect } from "react";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import UserListCard from "../UserListCard/UserListCard";

export default function LikesList(props){
    const [likes, setLikes] = useState(null);

    useEffect(() => {
        async function getLikes(){
            const res = await fetchDataWithAuth("/posts/"+props.post._id+"/likes", "GET");
            if(!res.data){
                alert(res.status);
            }
            else{
                setLikes(res.data);
            }
        }
        getLikes();
    }, [props.post._id])

    if(!likes){
        return(
            <div>LOADING..</div>
        )
    }
    return(
        <div className="Likes-list">
            <div style={{borderBottom:"1px solid lightgray", fontWeight:"bold", color:"rgb(255, 105, 51)"}}>Likes</div>
            {likes.length<=0?
                <div>Wow, still such empty!</div>:
                <div>{likes.map(like =>(
                    <UserListCard key={like._id} user={like} />
                ))}</div>
                
            }
        </div>
    )
}