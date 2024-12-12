import jwt from "jsonwebtoken"

const JWT_TOKEN_COOKIE_KEY = "token";

const generateJwt = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1d" });
}

const generateJwtAndSetCookie = (res, data) => {
    const token = generateJwt(data);
    res.cookie(JWT_TOKEN_COOKIE_KEY, token, {
        maxAge: 24 * 60 * 60 * 1000
    });
    return token;
}

const verifyToken = (token) => {
    try {
        if(jwt.verify(token, process.env.SECRET_KEY)) return true;
        return false;
    } catch (error) {
        return null;
    }
}

export { generateJwtAndSetCookie, generateJwt, verifyToken, JWT_TOKEN_COOKIE_KEY }