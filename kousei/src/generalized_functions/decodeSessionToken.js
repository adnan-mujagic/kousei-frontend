import jwt from "./jwt"

export default function decodeSessionToken(){
    const auth = JSON.parse(sessionStorage.getItem("token"));
    return jwt(auth.token);
}