const env = process.env;

const config = {
    db: {
        host : env.DB_HOST || "remotemysql.com",
        user : env.DB_USER || "cbNmT4E4iL",
        password : env.DB_PASSWORD|| "kofyABA7KZ" ,
        database : env.DB_NAME || "cbNmT4E4iL" ,
        //port : env.DB_PORT || 3306,
    }
};


module.exports = config;