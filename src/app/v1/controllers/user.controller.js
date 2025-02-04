const UserService = require("../services/user.service");

class UserController{
    async getUser(_,res){
        try{
            const user= await UserService.getUser();
            return res.status(200).json(user);
        } catch (err){
            return res.status(500).send(err);
        }
    }
}

module.exports = new UserController();