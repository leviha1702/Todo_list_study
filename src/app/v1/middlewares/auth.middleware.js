const { token } = require("morgan");
const authConstants = require("../../share/constants/auth.constants");
const TokenUtil = require("../../share/utils/token.util");
const tokenConfig = require("../../share/configs/token.conf");

class AuthMiddleware {
  static checkToken(req,res,next){
    //B1: Get token from header
    const accessToken = TokenUtil.removeBearerPrefix(
        req.headers["authorization"]
    );
    //B2: Check access token
    if(!accessToken){
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    //B3:Check Cookie have refresh token
    const refreshToken = req.cookies[authConstants.KeyCookie.RefreshToken];
    //B4: Check refresh token
    if(!refreshToken){
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    //B5: Verify access token
    try{
        const infoUserByToken = TokenUtil.verifyToken({
            token:accessToken,
            secret:tokenConfig.AccessSecret,
        });
        req.infoUserByToken = infoUserByToken;
        next();
    } catch (error){
        console.log(error);
    }
  }
}

module.exports =  AuthMiddleware;