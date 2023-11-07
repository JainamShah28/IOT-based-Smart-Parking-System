import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

const dbConfig = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
},
    dbPool = mysql.createPool(dbConfig);

export default dbPool;