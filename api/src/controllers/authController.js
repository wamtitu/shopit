import jwt from 'jsonwebtoken';
import sql from 'mssql';
import bcrypt from 'bcrypt';
import {config} from '../../config.js'


export const register = async (req, res)=>{
   
    try {
        const{name, email, phone, password, } = req.body;
        const userPassword = bcrypt.hashSync(password, 10);
        const pool = await sql.connect(config.sql)
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM dbo.users WHERE email = @email');
        const user = result.recordset[0];
        if (user) {
            res.status(409).json({ error: 'User already exists' });
           console.log("user already exist")
        } else{
            const newUser=await pool.request()
            .input("name", sql.VarChar, name)
            .input("userPassword", sql.VarChar, userPassword)
            .input("email", sql.VarChar, email)
            .input("phone", sql.VarChar, phone)
            .query('INSERT INTO dbo.users(name, userPassword, email, phone) VALUES(@name, @userPassword, @email, @phone)' )
            res.status(200).json(newUser.recordsets);
        }
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}

export const login= async (req, res)=>{
    try {
        const {email, password} = req.body;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input('email', sql.VarChar, email)
        .query(`SELECT * FROM users WHERE email = @email`)
        const user = result.recordset[0];
        if(!user){
            res.send('invalid email')
        }else{
            if(!bcrypt.compareSync(password, user.userPassword)){
                res.send('check your credentials')
            }
            else{
                const token = `JWT ${jwt.sign({name: user.name, email: user.email}, config.JWT_SECRET)}`
                res.json({email: user.email, name: user.name, id: user.userId, token: token})
            }
        }
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}