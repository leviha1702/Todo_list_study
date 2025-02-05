const UserModel = require("../models/user.model");

class AuthService{
    async register(){
        return {
            message: "User registered successfully",
        }
    }
}

module.exports = new AuthService();