const PasswordUtils = require("../../share/utils/password.util");
const AuthValidate = require("../../share/validates/auth.validate");
const UserModel = require("../models/user.model");

class AuthService{
    async register(body){
        //B1. Get data from body
        const {email,password} = body;
        //B2. Check validate email and password
        if(!email||!password){
            throw new Error("Email and password are require");
        }

        const checkEmail = AuthValidate.isEmailValid(email);

        if(!checkEmail){
            throw new Error("Invalid email");
        }
        //B3. Check email exist or not exist
        const user= await UserModel.findOneByEmail(email);
       
        //B4:
        //If account exist
        if(user){
            throw new Error("Email already exist");
        }
        //If account not exist
        //B5: Hash password
        const hashPassword = PasswordUtils.hash({password});

        console.log("hash",hashPassword);
        
        return {
            message: "User registered successfully",
        }
    }
}

module.exports = new AuthService();