import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2";

const dbConfig = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
},
    dbConnection = mysql.createConnection(dbConfig);

export default dbConnection;