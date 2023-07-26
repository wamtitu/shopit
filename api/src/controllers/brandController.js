import { config } from "../../config.js";
import sql from 'mssql'

export const getBrands = async (req, res) => {
    let pool = await sql.connect(config.sql)
    const result = await pool.request()
    .query('SELECT * FROM brand')
    !result.recordset[0] ? res.status(404).json({ message: 'no brand found' }) :
        res.status(200).json(result.recordset);
    sql.close(); 
  };