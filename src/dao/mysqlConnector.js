const mysql = require('mysql');

class MySQLConnector {

    
    //heroku
    /*
    get MYSQL_DB_USER() { return process.env.MYSQL_DB_USER || 'ba5429351fb4e3' }
    get MYSQL_DB_NAME() { return process.env.MYSQL_DB_NAME || 'heroku_0c12e22e60e1c87' }
    get MYSQL_DB_PASSWORD() { return process.env.MYSQL_DB_PASSWORD || '933edc03b3da5ba' }
    get MYSQL_DB_ADDRESS() { return process.env.MYSQL_DB_ADDRESS || 'us-cdbr-iron-east-02.cleardb.net' }
    get MYSQL_DB_POOL_SIZE() { return process.env.MYSQL_DB_POOL_SIZE || 10 }
    */
    
    get MYSQL_DB_USER() { return process.env.MYSQL_DB_USER || 'root' }
    get MYSQL_DB_NAME() { return process.env.MYSQL_DB_NAME || 'mobdique' }
    get MYSQL_DB_PASSWORD() { return process.env.MYSQL_DB_PASSWORD || 'admin' } //root
    get MYSQL_DB_ADDRESS() { return process.env.MYSQL_DB_ADDRESS || 'localhost' }
    get MYSQL_DB_POOL_SIZE() { return process.env.MYSQL_DB_POOL_SIZE || 10 }
    

    constructor() {
        this.internalPool = mysql.createPool({
            host: this.MYSQL_DB_ADDRESS,
            user: this.MYSQL_DB_USER,
            database: this.MYSQL_DB_NAME,
            password: this.MYSQL_DB_PASSWORD,
            connectionLimit: this.MYSQL_DB_POOL_SIZE,
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
