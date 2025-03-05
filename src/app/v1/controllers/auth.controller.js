const authService = require("../services/auth.service");
const AuthService = require("../services/auth.service");

class AuthController{
    async register(req,res){
        try{
            const result= await AuthService.register(req.body);
            return res.status(200).json(result);
        } catch (err){
            return res.status(500).send({
                message:err.message
            });
        }
    }
    async login(req, res){
        try{
            const result = await AuthService.login(req.body,res);
            return res.status(200).json(result);
        } catch (err){
            return res.status(500).send({
                message:err.message,
            });
        }
    }
    async logout (_,res){
        try{
            const result = await authService.logout(res);
            return res.status(200).json(result);
        } catch (err){
            return res.status(500).send({
                message:err.message,
            });
        }
    }
    async forgotPassword(req,res){
        try{
            const result = await AuthService.forgotPassword(req.body);
            return res.status(200).json(result);
        }catch (err){
            return res.status(500).send({
                message:err.message,
            });
        }
    }
    async renewTokenByRefreshToken(req,res){
        try{
            const result = await AuthService.renewTokenByRefreshToken(req);
            return res.status(200).json(result);
        }catch (err){
            return res.status(500).send({
                message:err.message,
            });
        }
    }
}

module.exports = new AuthController();