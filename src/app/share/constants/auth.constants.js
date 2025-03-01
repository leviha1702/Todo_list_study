const authConstants = {
    LoginType:{
        Email:10,
        Username:20,
    },
    JwtTime:{
        AccessToken:"15m",
        RefreshToken:"7d",
    },

    KeyCookie:{
        RefreshToken:"auth_refresh_token",
    },

    JwtMessage:{
        TokenExpired:"TokenExpiredError",
        TokenSignatureRerror:"JsonWebTokenError",
    }
};

module.exports = authConstants;