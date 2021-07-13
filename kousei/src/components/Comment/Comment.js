import "./Comment.css"

export default function Comment(props) {
    return (
        <div className="Comment">
            <div className="Comment-header">
                <div className="Comment-creator">{props.comment.creator.username}</div>
            </div>
            <div className="Comment-content">{props.comment.content}</div>
        </div>
    )
}