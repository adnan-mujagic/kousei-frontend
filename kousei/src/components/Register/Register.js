import "./Register.css";
import { useState, useEffect } from "react";
import { Button, TextField, makeStyles} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import fetchDataWithoutAuth from "../../generalized_functions/fetchWithoutAuth";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: "280px",
      },
    },
  }));

export default function Register(props){
    const classes = useStyles();

    const [user, setUser] = useState({
        full_name:"",
        username:"",
        password:"",
        phone_number:"",
        email:"",
        age:"",
        bio:"",
        profile_picture:""
    });

    useEffect(() => {
        
        console.log(user)
    }, [user])

    const [stage, setStage] = useState("one");

    const [alertText, setAlertText] = useState("");
    const [alertExists, setAlertExists] = useState(false);

    const register = async (e) => {
        e.preventDefault();
        let res = await fetchDataWithoutAuth("/users","POST", user);
        if(!res.data){
            setAlertText(res.status);
            setAlertExists(true);
        }
        else{
            res = await fetchDataWithoutAuth("/users/login", "POST", {
                username:user.username,
                password:user.password
            })
            if(!res.token){
                setAlertText(res.status);
                setAlertExists(true);
            }
            else{
                props.setToken(res)
            }
        }

    }

    const handleChange = (event,fieldName) => {
        const value = event.target.value;
        setUser(prevUser => {
            return {...prevUser, [fieldName]:value}
        });
    }

    const handleChangeStage = () => {
        setStage("two");
    }

    const handleChangeStageBack = () => {
        setStage("one");
    }

    
    return(
        <div>
            {alertExists?<Alert severity="error">{alertText}</Alert>:null}
            <form className={`Register ${stage==="one"?"":"Invisible"} ${classes.root}`}>
                <TextField required label="Full Name" variant="outlined" 
                    onChange={e => {handleChange(e, "full_name")}} value={user.full_name}
                />
                <TextField required label="Username" variant="outlined" onChange={e => handleChange(e, "username")} value={user.username}/>
                <TextField required label="Password" type="password" variant="outlined" onChange={e => handleChange(e, "password")} value={user.password}/>
                <TextField required label="E-mail" variant="outlined" onChange={e => handleChange(e, "email")} value={user.email}/>
                <TextField required label="Phone Number" variant="outlined" onChange={e => handleChange(e, "phone_number")} value={user.phone_number}/>
                <div className="Register-button-wrapper">
                    <Button color="secondary" onClick={handleChangeStage}>Next</Button>
                    <Button onClick={props.openLogin}>Have an account?</Button>
                </div>
            </form>
            <form onSubmit={register} className={`Register ${stage==="two"?"":"Invisible"} ${classes.root}`}>
                <TextField required label="Age" type="number" variant="outlined" onChange={e => handleChange(e, "age")} value={user.age}/>
                <TextField label="Profile Picture URL" variant="outlined" onChange={e => handleChange(e, "profile_picture")} value={user.profile_picture}/>
                <TextField required label="Bio" variant="outlined" onChange={e => handleChange(e, "bio")} value={user.bio}/>
                <div className={"Register-button-wrapper"}>
                    <Button color="secondary" onClick={handleChangeStageBack}>Back</Button>
                    <Button color="secondary" type="submit">Register</Button>
                    <Button onClick={props.openLogin}>Have an account?</Button>
                </div>
                
            </form>
        </div>
        
    )

    
        
    
    

    
}