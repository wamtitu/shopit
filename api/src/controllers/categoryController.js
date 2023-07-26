import { config } from "../../config.js";
import sql from 'mssql'

export const getCategory = async (req, res) => {
    let pool = await sql.connect(config.sql)
    const result = await pool.request()
    .query("SELECT * FROM category");
    !result.recordset[0] ? res.status(404).json({ message: 'no categories found' }) :
        res.status(200).json(result.recordset);
    sql.close(); 
  };