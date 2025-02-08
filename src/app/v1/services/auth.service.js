const authConstants = require("../../share/constants/auth.constants");
const PasswordUtils = require("../../share/utils/password.util");
const AuthValidate = require("../../share/validates/auth.validate");
const UserModel = require("../models/user.model");

class AuthService{
    // A. Complete register
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
        const user= await UserModel.findOneByEmail({email});
       
        //B4:
        //If account exist
        if(user){
            throw new Error("Email already exist");
        }
        //If account not exist
        //B5: Hash password
        const hashPassword = PasswordUtils.hash({password});

        console.log("hash",hashPassword);

        //B6: Save account to database
        const newUser = await UserModel.create({email,password:hashPassword});

        return {
            user:{
                userId : newUser.id,
                email: newUser.email,
            },
            message: "User registered successfully",
        }
    }
    //B.Complete login
    async login(body){
        //B1: Get data form body
        const {identify, password}= body;
        //B2: Check type login
        const checkTypeLogin = AuthValidate.checkTypeLogin(identify);
        console.log("AuthService -> login -> checkTypeLogin", checkTypeLogin);
        
        //B3:Check validate
        let user;
        if(checkTypeLogin === authConstants.LoginType.Email){
            const checkEmail = AuthValidate.isEmailValid(identify);
            if(!checkEmail){
                throw new Error("Invalid email");
            }
        //B4: Check email exist or not exist
            user = await UserModel.findOneByEmail({email:identify});
        } else if(checkTypeLogin === authConstants.LoginType.Username){
            const checkUsername = AuthValidate.isUsernameValid(identify);
            if(checkUsername){
                throw new Error("Invalid username");
            }
        //B4. Check email exist or not exist
            user = await UserModel.findOneByUsername({username:identify});
        }
        if(!user){
            throw new Error("Account not exist");
        }
        console.log("AuthService -> login -> user", user);
        //B5: Check compare password
        const comparePassword = await PasswordUtils.compare({
            password,
            hash: user.password_hash
        });

        if(!comparePassword){
            throw new Error("Password is incorrect");
        }

        return {
            message:"Login successfully",
        };
    }

}

module.exports = new AuthService();