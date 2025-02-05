const AuthService = require("../services/auth.service");

class AuthController{
    async register(_,res){
        try{
            const result= await AuthService.register();
            return res.status(200).json(result);
        } catch (err){
            return res.status(500).send(err);
        }
    }
}

module.exports = new AuthController();