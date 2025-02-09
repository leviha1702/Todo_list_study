const jwt  = require("jsonwebtoken");

class TokenUtil{
    static generateAccessToken({
        payload,
        secret,
        expiresIn = authConstants.JwtTime.AccessToken,
    }) {
        return jwt.sign(payload, secret,{expiresIn});
    }
    
}

module.exports = TokenUtil;