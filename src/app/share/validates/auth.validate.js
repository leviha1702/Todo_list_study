const _ = require("lodash");

class AuthValidate {
    static isEmailValid(email){
        if(!_.isString(email)){
            return false;
        }

        const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return emailRegex.test(email);
    }
}

module.exports = AuthValidate;