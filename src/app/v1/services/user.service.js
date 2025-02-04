const UserModel = require("../models/user.model");

class UserService{
    async getUser(){
        return UserModel.getUser({id: 1});
    }
}

module.exports = new UserService();