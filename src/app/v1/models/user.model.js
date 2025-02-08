const pgDatabase = require("../../share/database/pg.database");

class UserModel {
    async create({email,password}){
        try{
            const query= "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *";
            const values = [email,password];
            const {rows} = await pgDatabase.query(query,values);
            return rows[0];
        } catch (error){
            throw Logger.logError(error);
        }
    }
    async getUser({id}){
        const query = "SELECT* FROM users WHERE id = $1";
        const values = [id];

        const {rows} = await pgDatabase.query(query,values);
        return rows[0];
    }
    async findOneByEmail(email){
        try{
            const query = "SELECT * FROM users WHERE email = $1 AND is_deleted = false";
            const values = [email];
            const {rows} = await pgDatabase.query(query,values);
            return rows[0];
        } catch (error){
            console.log("UserModel -> findOneByEmail -> error",error);
            throw error; 
        }
    }

}

module.exports = new UserModel();
