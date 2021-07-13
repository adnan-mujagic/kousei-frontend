import "./CreateComment.css";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import { useState } from "react";

export default function CreateComment(props) {
    const [comment, setComment] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetchDataWithAuth("/posts/" + props.post._id + "/comments", "POST", {
            content: comment
        })
        const res = await fetchDataWithAuth("/posts/" + props.post._id + "/comments", "GET");
        props.setComments(res.data);
        setComment("");
    }

    return (
        <form className="Create-comment" onSubmit={handleSubmit}>
            <input placeholder="Add a comment..." value={comment} onChange={(e) => { setComment(e.target.value) }} />
            <button className="Normal-button" type="submit">Submit</button>
        </form>
    )
}