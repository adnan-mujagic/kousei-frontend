import "./Login.css";
import { useState } from "react"
import fetchDataWithoutAuth from "../../generalized_functions/fetchWithoutAuth";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert'
import Register from "../Register/Register";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "280px",
    },
  },
}));

async function loginUser(credentials) {
    return fetchDataWithoutAuth("/users/login", "POST", credentials);
}

export default function Login({ setToken }) {
    const [login, setLogin] = useState(true);
    const [titleText, setTitleText] = useState("Welcome back, please sign in below!")
    const [alertText, setAlertText] = useState("");
    const [alertExists, setAlertExists] = useState(false);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const classes = useStyles();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await loginUser({
            username,
            password
        });
        if (data.token) {
            setToken(data);
        }
        else{
            setAlertExists(true);
            setAlertText(data.status)
        }
    }

    const handleOpenRegister = () => {
        setLogin(false);
        setAlertText("");
        setAlertExists(false);
        setTitleText("Register form")
    }

    const handleOpenLogin = () => {
        setLogin(true);
        setTitleText("Welcome back, please sign in below!")
    }

    return (
        <div className="Login">
            <div className={"Login-form-wrapper "+classes.root}>
                <h2>{titleText}</h2>
                {login?<form onSubmit={handleSubmit} autoComplete="off">
                    {alertExists?<Alert style={{width:"246px"}} severity="error">{alertText}</Alert>:null}
                    <TextField required variant="outlined" label="Username" onChange={e => setUserName(e.target.value)}/>
                    <TextField required type="password" variant="outlined" label="Password" onChange={e => setPassword(e.target.value)}/>
                    <div className="Action-buttons">
                        <Button color="secondary" type="submit">Login</Button>
                        <Button onClick={handleOpenRegister}>Want to Register?</Button>
                    </div>
                </form>:<Register setToken={setToken} openLogin={handleOpenLogin} />}
            </div>
        </div>
    )



}