const mysql = require('mysql2/promise')
export const createConn = () => {
    return mysql.createConnection({
        host: "43.133.193.236",
        user: "root",
        password: "!Yanyan1234",
        database: "yt-assistant",
    });
}