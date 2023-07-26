import jwt from 'jsonwebtoken';
import sql from 'mssql';
import bcrypt from 'bcrypt';
import {config} from '../../config.js'


export const register = async (req, res) => {
    try {
      const { name, email, phone, password, isAdmin } = req.body;
      const userPassword = bcrypt.hashSync(password, 10);
      const pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input("email", sql.VarChar, email)
        .query("SELECT * FROM dbo.users WHERE email = @email");
      const user = result.recordset[0];
      if (user) {
        res.status(409).json({ error: "User already exists" });
        console.log("User already exists");
      } else {
        const newUser = await pool
          .request()
          .input("name", sql.VarChar, name)
          .input("userPassword", sql.VarChar, userPassword)
          .input("email", sql.VarChar, email)
          .input("phone", sql.VarChar, phone)
          .input("isAdmin", sql.Bit, isAdmin ? 1 : 0) // Convert isAdmin to 1 (true) or 0 (false)
          .query(
            "INSERT INTO dbo.users(name, userPassword, email, phone, isAdmin) VALUES(@name, @userPassword, @email, @phone, @isAdmin)"
          );
        res.status(200).json(newUser.recordsets);
      }
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  };
  

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
                res.json({email: user.email, name: user.name, id: user.userID, token: token, phone: user.phone, admin: user.isAdmin})
            }
        }
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}


export const getAllUsers = async (req, res) => {
  let pool = await sql.connect(config.sql)
  const result = await pool.request()
  .query("SELECT * FROM users");
  !result.recordset[0] ? res.status(404).json({ message: 'no users found' }) :
      res.status(200).json(result.recordset);
};

export const deleteUser = async (req, res) => {
  try{
    const {id} = req.params;
    let pool = await sql.connect(config.sql);
  const result = await pool.request().query(`DELETE FROM users WHERE userID = ${id}`)
  res.status(200).send('user deleted')
  }catch(error){
    res.status(200).send(error)
    console.log(error)
  }finally{
    sql.close();
  }
}

export const updateUser = async (req, res)=>{
  try {
    const id = req.params.id;
    const{name,phone,email,isAdmin} = req.body;
    let pool = await sql.connect(config.sql);
    const updatedUser = await pool.request()
    .input("name", sql.VarChar, name)
    .input("phone", sql.VarChar, phone)
    .input("email", sql.VarChar, email)
    .input("isAdmin", sql.Bit, isAdmin? 1: 0)
    .query(`UPDATE users
    SET name = @name,
        phone = @phone,
        email = @email,
        isAdmin = @isAdmin
    WHERE userID = ${id};
    `)
    res.status(200).json(updatedUser)
    
  } catch (error) {
    res.send(error)
    console.log(error)
  }
}