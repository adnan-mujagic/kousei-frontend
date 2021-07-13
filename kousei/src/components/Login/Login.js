import "./Login.css";
import { useState } from "react"
import fetchDataWithoutAuth from "../../generalized_functions/fetchWithoutAuth";

async function login(credentials) {
    return fetchDataWithoutAuth("/users/login", "POST", credentials);
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await login({
            username,
            password
        });
        if (data.token) {
            setToken(data);
        }
    }
    return (
        <div className="login">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <h2>Hello, please sign in in the form below!</h2>

                    <label>
                        <p>Username</p>
                        <input type="text" placeholder="Username..." onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" placeholder="Password..." onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div>
                        <button className="login-button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )



}