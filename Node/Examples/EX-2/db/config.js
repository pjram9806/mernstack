const mssql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();


const dbConfig = {
    user:process.env.DB_USER,
    password:process.env.DB_PWD,
    server:process.env.DB_SERVER,
    database:process.env.DB_NAME,
    options:{
    encrypt:true,
    trustServerCertificate:true
}
    
}


module.exports = {dbConfig,mssql};