import jwt from "jsonwebtoken"
import { JWT_TOKEN_COOKIE_KEY } from "../utils/generateJwt.js";

const authMiddleware = (req, res, next) => {
    if (!req.cookies || !req.cookies[JWT_TOKEN_COOKIE_KEY]){
        return res.status(401).json({ error: true, message : "No token provided" });
    }
    const token = req.cookies[JWT_TOKEN_COOKIE_KEY];
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        if (!data) {
            return res.status(401).json({ error: true, message : "Invalid Token" })
        }
        req.userId = data._id;        
        next()
    } catch (error) {
        return res.status(401).json({ error: true, message : "Invalid Token" })
    }
}

export { authMiddleware }