let jwt = require("jsonwebtoken");
export default function verify(token) {
    return jwt.verify(token, "MY_KEY");
}