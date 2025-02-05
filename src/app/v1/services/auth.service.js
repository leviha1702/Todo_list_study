const UserModel = require("../models/user.model");

class AuthService{
    async register({email, password}){
        //B1. Check validate email and password
        if(!email||!password){
            throw new Error("Email and password are require");
        }
        return {
            message: "User registered successfully",
        }
    }
}

module.exports = new AuthService();