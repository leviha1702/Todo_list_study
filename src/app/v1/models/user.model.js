const pgDatabase = require("../../share/database/pg.database");

class UserModel {
    async create({email,password}){
        try{
            const query= "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *";
            const values = [email,password];
            const {rows} = await pgDatabase.query(query,values);
            return rows[0];
        } catch (error){
            console.log("UserModel -> create ->error",error);
        }
    }
    async getUser({id}){
        const query = "SELECT* FROM users WHERE id = $1";
        const values = [id];

        const {rows} = await pgDatabase.query(query,values);
        return rows[0];
    }
    async findOneByEmail({email}){
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
    async findOneByUsername({username}){
        try{
            const query = "SELECT * FROM users WHERE username = $1 AND is_deleted = false";
            const values = [username];
            const {rows} = await pgDatabase.query(query,values);
            return rows[0];
        } catch (error){
            console.log("UserModel -> findOneByUsername -> error",error);
            throw error; 
        }
    }
    async updatePassword({id,password}){
        try{
            const query = "UPDATE users SET password_hash = $1 WHERE id = $2";
            const values = [password,id];
            await pgDatabase.query(query,values);
        } catch (error){
            console.log("UserModel -> updatePassword -> error",error);
            throw error;
        }
    }
}

module.exports = new UserModel();
