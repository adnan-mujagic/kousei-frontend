import "./CreateComment.css";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import { useState } from "react";

export default function CreateComment(props) {
    const [comment, setComment] = useState("");
    const [warningsExist, setWarningsExist] = useState(false);
    const [warningText, setWarningText] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(comment.length<2){
            setWarningText("You need to type at least two letters to post a comment!")
            setWarningsExist(true);
        }
        else{
            await fetchDataWithAuth("/posts/" + props.post._id + "/comments", "POST", {
                content: comment
            })
            const res = await fetchDataWithAuth("/posts/" + props.post._id + "/comments", "GET");
            if(!res.data){
                setWarningText(res.status);
                setWarningsExist(true);
            }
            else{
                props.setComments(res.data);
                setComment("");
                setWarningText("");
                setWarningsExist(false);
            }
            
        }
        
    }

    return (
        <div className="Create-comment-wrapper">
        {warningsExist?
            <div className="Warning-alert">{warningText}</div>:
            null    
        }
        <form className="Create-comment" onSubmit={handleSubmit}>
            <input placeholder="Add a comment..." value={comment} onChange={(e) => { setComment(e.target.value) }} />
            <button className="Normal-button" type="submit">Submit</button>
        </form>
        </div>
        
    )
}