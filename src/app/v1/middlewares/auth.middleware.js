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
        switch(error.name){
            case authConstants.JwtMessage.TokenExpired:
                return res.status(401).json({
                    message: "Token expired",
                });
            case authConstants.JwtMessage.TokenSignatureRerror:
                return res.status(401).json({
                    message: "Token signature error",
                });
            default:
                return res.status(500).json({
                    message: "Internal Server Error",
                });
            }
    }
    //B6: Check error token(Signature,Expired...)
    switch(error.name){
        case authConstants.JwtMessage.TokenExpired:
            return res.status(401).json({
                message: "Token expired",
            });
        case authConstants.JwtMessage.TokenSignatureRerror:
            return res.status(401).json({
                message: "Token signature error",
            });
        default:
            return res.status(500).json({
                message: "Internal Server Error",
            });
    }
  }
  static checkRefreshToken(req,res,next){
    //B1: Check Cookie have refresh token
    const refreshToken = req.cookies[authConstants.KeyCookie.RefreshToken];
    //B2: Check refresh token
    if(!refreshToken){
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    //B3: Verify refresh token
    try{
        const infoUserByRefetchToken = TokenUtil.verifyToken({
            token:refreshToken,
            secret:tokenConfig.RefreshSecret,
        });
        req.infoUserByRefetchToken = infoUserByRefetchToken;
        next();
    } catch (error){
        switch(error.name){
            case authConstants.JwtMessage.TokenExpired:
                return res.status(401).json({
                    message: "Token expired",
                });
            case authConstants.JwtMessage.TokenSignatureRerror:
                return res.status(401).json({
                    message: "Token signature error",
                });
            default:
                return res.status(500).json({
                    message: "Internal Server Error",
                });
            }
    }
  }
}


module.exports =  AuthMiddleware;