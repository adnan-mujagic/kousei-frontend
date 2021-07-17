import "./UserListCard.css";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root:{
        margin:"5px",
        border: "1px solid rgb(240,240,240)"
    }
}))

export default function UserListCard(props){
    const classes = useStyles();
    console.log(classes.root);

    const onUserClick = () => {
        window.location = "/users/"+props.user._id;
    }

    return(
        <div className="User-list-card" onClick={onUserClick}>
            <Avatar src={props.user.profile_picture} alt={props.user.username} className={classes.root}/>
            <div className="User-list-card-credentials">
                <div className="User-list-card-full-name">{props.user.full_name}</div>
                <div className="User-list-card-username">@{props.user.username}</div>
            </div>
        </div>
    )
}