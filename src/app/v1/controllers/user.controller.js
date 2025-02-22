const UserService = require("../services/user.service");

class UserController{
    async getUser(req,res){
        try{
            const result= await UserService.getUser(req.params);
            return res.status(200).json(result);
        } catch (err){
            return res.status(500).send(err);
        }
    }
}

module.exports = new UserController();