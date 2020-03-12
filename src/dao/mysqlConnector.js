const mysql = require('mysql');

class MySQLConnector {

    
    //heroku 
    // mysql://bd6e2286211394:191bfa8c@us-cdbr-iron-east-04.cleardb.net/heroku_93f17607b5229a4?reconnect=true
    get MYSQL_DB_USER() { return process.env.MYSQL_DB_USER || 'bd6e2286211394' }
    get MYSQL_DB_NAME() { return process.env.MYSQL_DB_NAME || 'heroku_93f17607b5229a4' }
    get MYSQL_DB_PASSWORD() { return process.env.MYSQL_DB_PASSWORD || '191bfa8c' }
    get MYSQL_DB_ADDRESS() { return process.env.MYSQL_DB_ADDRESS || 'us-cdbr-iron-east-04.cleardb.net' }
    get MYSQL_DB_POOL_SIZE() { return process.env.MYSQL_DB_POOL_SIZE || 1000 }


    constructor() {
        this.internalPool = mysql.createPool({
            host: this.MYSQL_DB_ADDRESS,
            user: this.MYSQL_DB_USER,
            database: this.MYSQL_DB_NAME,
            password: this.MYSQL_DB_PASSWORD,
            connectionLimit: this.MYSQL_DB_POOL_SIZE,
            connectTimeout: 60 * 60 * 1000,
            acquireTimeout: 60 * 60 * 1000,
            timeout: 60 * 60 * 1000,
            waitForConnections: true
        })

        this.registerThreadCounter()
    }

    registerThreadCounter() {
        this.internalPool.on('connection', (connection) => console.log(`New connection stablished with server on thread #${connection.threadId}`))
    }

    get pool() {
        return this.internalPool
    }
}

module.exports = new MySQLConnector()
