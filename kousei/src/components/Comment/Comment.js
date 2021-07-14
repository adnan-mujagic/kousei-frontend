import "./Comment.css"
import jwt from "../../generalized_functions/jwt";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import {useState} from "react"
import {BsTrash} from "react-icons/bs"

export default function Comment(props) {
    const token = JSON.parse(sessionStorage.getItem("token"))
    const decoded = jwt(token.token);
    const [owner] = useState(decoded.uid===props.comment.creator._id);

    const onRemoveClick = async () => {
        let res = await fetchDataWithAuth("/comments/"+props.comment._id, "DELETE");
        if(!res.data){
            alert(res.status);
        }
        else{
            res = await fetchDataWithAuth("/posts/" + props.post_id+"/comments", "GET");
            if(!res.data){
                alert(res.status);
            }
            else{
                props.setComments(res.data);
            }
            
        }
    }

    return (
        <div className="Comment">
            <div className="Comment-header">
                <div className="Comment-creator">@{props.comment.creator.username}</div>
            </div>
            <div className="Comment-content-wrapper">
                <div className="Comment-content">{props.comment.content}</div>
                {owner?<div className="Trash-container"><BsTrash onClick={onRemoveClick} className="Trash-icon"/></div>:null}
            </div>
            
        </div>
    )
}