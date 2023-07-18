import sql from 'mssql';
import { config } from '../../config.js';


export const addProduct = async (req, res) => {
    const { name, brand, category, description, price, images, status} = req.body;
    try {
        let pool = await sql.connect(config.sql);
     // Check if the category exists
     const categoryResult = await pool
     .request()
     .input('category', sql.VarChar, category)
     .query('SELECT categoryID FROM category WHERE categoryName = @category');

   let categoryId;
   if (categoryResult.recordset.length === 0) {
     // Category does not exist, create a new one
     const createCategory = await pool
       .request()
       .input('category', sql.VarChar, category)
       .query('INSERT INTO category (categoryName) VALUES (@category); SELECT SCOPE_IDENTITY() AS categoryID');

     categoryId = createCategory.recordset[0].categoryID;
   } else {
     // Category exists, retrieve its ID
     categoryId = categoryResult.recordset[0].categoryID;
   }

   // Check if the brand exists
   const brandResult = await pool
     .request()
     .input('brand', sql.VarChar, brand)
     .query('SELECT brandID FROM brand WHERE brandName = @brand');

   let brandId;
   if (brandResult.recordset.length === 0) {
     // brand does not exist, create a new one
     const createBrand = await pool
       .request()
       .input('brand', sql.VarChar, brand)
       .query('INSERT INTO brand (brandName) VALUES (@brand); SELECT SCOPE_IDENTITY() AS brandID');

     brandId = createBrand.recordset[0].brandID;
   } else {
     // brand exists, retrieve its ID
     brandId = brandResult.recordset[0].brandID;
   }

   //insert the product into the database
        const result = await pool.request()
            .input('name', sql.VarChar, name)
            .input('brandId', sql.Int, brandId)
            .input('categoryId', sql.Int, categoryId)
            .input('description', sql.VarChar, description)
            .input('price', sql.VarChar, price)
            .input('images', sql.VarChar, images)
            .input('status', sql.VarChar, status)
            .query('insert into product (name, brand, category, description, price, images, status) values (@name, @brandId, @categoryId, @description, @price, @images, @status)');
            result.output.errorMessage ? res.status(400).json({ message: result.output.errorMessage }) :
            res.status(200).json({ message: 'product added successfully' });
    } catch (error) {
        res.status(201).json({ error: error.message });
        console.log(error)
    }
    finally {
        sql.close(); 
    }
}

export const getProductsByCategory = async (req, res) => {
  const {categoryName}= req.params;
  let pool = await sql.connect(config.sql)
  const result = await pool.request()
  .input('categoryName', sql.VarChar, categoryName)
  .query("SELECT name, description, price, status, brandName FROM product INNER JOIN brand ON product.brand = brand.brandID WHERE product.category = (SELECT categoryID FROM category WHERE categoryName = @categoryName)");
  !result.recordset[0] ? res.status(404).json({ message: 'category not found' }) :
      res.status(200).json(result.recordset);
  sql.close(); 
};

export const getProductsByBrand = async (req, res) => {
  const {brandName}= req.params;
  let pool = await sql.connect(config.sql)
  const result = await pool.request()
  .input('brandName', sql.VarChar, brandName)
  .query("SELECT name, description, price, status, categoryName FROM product INNER JOIN category ON product.category = category.categoryID WHERE product.brand = (SELECT brandID FROM brand WHERE brandName = @brandName)");
  !result.recordset[0] ? res.status(404).json({ message: 'brand not found' }) :
      res.status(200).json(result.recordset);
  sql.close(); 
};

export const getProductsByID = async (req, res) => {
  const {id}= req.params;
  let pool = await sql.connect(config.sql)
  const result = await pool.request()
  .input('id', sql.VarChar, id)
  .query(`SELECT name, images, productID, description, price, status, brandName, categoryName FROM product INNER JOIN brand ON product.brand = brand.brandID INNER JOIN category ON product.category = category.categoryID WHERE productID = ${id}`);
  !result.recordset[0] ? res.status(404).json({ message: 'product not found' }) :
      res.status(200).json(result.recordset);
  sql.close(); 
};

export const getProducts = async (req, res) => {
  let pool = await sql.connect(config.sql)
  const result = await pool.request()
  .query("SELECT name, productID, description, price,images, status, brandName, categoryName FROM product INNER JOIN brand ON product.brand = brand.brandID INNER JOIN category ON product.category = category.categoryID");
  !result.recordset[0] ? res.status(404).json({ message: 'no items found' }) :
      res.status(200).json(result.recordset);
  sql.close(); 
};