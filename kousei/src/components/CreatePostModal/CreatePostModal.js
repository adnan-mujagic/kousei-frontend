import "./CreatePostModal.css";
import { TextField, Button, Switch, FormGroup, FormControlLabel, makeStyles } from "@material-ui/core";
import { useState } from "react";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import decodeSessionToken from "../../generalized_functions/decodeSessionToken"

const useStyles = makeStyles((theme) => ({
    createPost:{
        padding:theme.spacing(1),
        borderRadius: "5px",
        background:theme.palette.background.paper,
        maxWidth:"700px",
        marginTop:"20px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        }
    },
    inputs:{
        marginTop:"10px"
    }
}))

export default function CreatePostModal(props){
    const classes = useStyles();
    const decoded = decodeSessionToken();

    console.log(props.hidden);

    const [post, setPost] = useState({
        image:"",
        caption:"",
        comments_enabled:true,
    });

    const onPostChange = (e, fieldName, checkbox) => {
        let value = null;
        checkbox?value=e.target.checked:value=e.target.value;
        
        setPost(prevPost => {
            return {...prevPost, [fieldName]:value}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetchDataWithAuth("/users/"+decoded.uid+"/posts", "POST", post);
        if(!res.data){
            alert(res.status);
        }
        else{
            alert(res.status);
        }
    }

    return(
        <form className={props.hidden?" Hidden-create-post":""+classes.createPost+" Create-Post-Modal"} onSubmit={handleSubmit}>
            
                <div className="Create-post-wrapper">
                    <TextField label="Caption" required variant="outlined" value={post.caption}  onChange={e => onPostChange(e, "caption")}/>
                    <TextField className={classes.inputs} label="Image URL" variant="outlined" value={post.image}  onChange={e => onPostChange(e, "image")}/>
                    
                    <div className="Create-post-footer">
                        <FormGroup row >
                            <FormControlLabel
                                control={<Switch checked={post.comments_enabled} onChange={e => onPostChange(e, "comments_enabled", true)} name="checkedA" />}
                                label="Enable Comments?"
                            />
                        </FormGroup>
                        
                        <Button color="secondary" type="submit">Post</Button>
                    </div>
                </div>  
        </form>
    )
    
}