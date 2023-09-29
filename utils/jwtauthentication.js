const jwt = require('jsonwebtoken');

export const authenticateUser = async(req,jwt_secret) => {
    const {token} = req.body;
    const user = await jwt.verify(token,jwt_secret)
    return user;
}