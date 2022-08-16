const  mysql = require('mysql2/promise');
const config = require('../config');

var connection = null;

async function db_connect(){
    try{
        connection = await mysql.createConnection(config.db);
        console.log("DB connection established");
    }
    catch(e){
        console.log("DB connection failed");
    }
}

async function query(sql,params){
    await db_connect();
    const [results,] = await connection.execute(sql,params);
    return results;
    
}

module.exports = {
    db_connect,
    query
}