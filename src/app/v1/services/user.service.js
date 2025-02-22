const UserModel = require("../models/user.model");

class UserService{
    async getUser(params){
        const {userId} = params;
        const user = await UserModel.getUser({id: userId});
        return {
            user:user?user:[],
            message:"User found successfully",
        };
    }
}

module.exports = new UserService();