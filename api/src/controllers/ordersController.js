import { config } from "../../config.js";
import sql from 'mssql'


export const getOrders = async (req, res) => {
    let pool = await sql.connect(config.sql)
    const result = await pool.request()
    .query("SELECT orderID, users.name, orders.productName, orders.quantity, orders.shippingAddress, orders.totalAmount, users.phone, users.email, orders.orderDate FROM orders INNER JOIN users ON users.userID = orders.userID");
    !result.recordset[0] ? res.status(404).json({ message: 'no orders found' }) :
        res.status(200).json(result.recordset);
    sql.close(); 
  };
  export const getOrderByID = async (req, res) => {
    const {id}= req.params;
    let pool = await sql.connect(config.sql)
    const result = await pool.request()
    .input('id', sql.VarChar, id)
    .query(`SELECT users.name, orders.productName, orders.quantity, orders.shippingAddress, orders.totalAmount, users.phone, orders.orderID, orders.orderDate
    FROM users
    INNER JOIN orders ON users.userID = orders.userID WHERE users.userID = ${id}`);
    !result.recordset[0] ? res.status(404).json({ message: 'no  orders found' }) :
        res.status(200).json(result.recordset);
    sql.close(); 
  };