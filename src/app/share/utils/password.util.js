const bcrypt = require("bcrypt");

class PasswordUtils{
    static hash ({password}){
        return bcrypt.hashSync(password,10);
    }
    static async compare ({password,hash}){
        return bcrypt.compare(password,hash);
    }
}

module.exports = PasswordUtils;