import dotenv from 'dotenv';
dotenv.config();


const {DB_HOST, DB_PASSWORD, DB_USERNAME, DB_DATABASE, PORT, STRIPE_KEY, CLIENT_URL} = process.env;

export const config = {
    port: PORT,
    stripe: STRIPE_KEY,
    client: CLIENT_URL,
    JWT_SECRET: 'wamutitu',
    sql: {
        server: DB_HOST,
        password: DB_PASSWORD,
        user: DB_USERNAME,
        database: DB_DATABASE,
        options: {
            encrypt: false,
            trustServerCertificate:true,
        }
    }
}
