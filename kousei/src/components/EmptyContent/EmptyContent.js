import "./EmptyContent.css";

export default function EmptyContent(props){
    return(
        <div className="Empty-content">
            <img alt="Search icon" className="Empty-image" src="https://image.flaticon.com/icons/png/512/4624/4624116.png"></img>
            <div>It's quiet here...Way too quiet!</div>
        </div>
    )
}