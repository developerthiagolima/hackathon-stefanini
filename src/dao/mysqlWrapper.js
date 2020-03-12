const mySQLConnector = require('./mysqlConnector');

module.exports = class MySQLWrapper {
    
    static createQuery({query, params}) {

        return new Promise((succeed, fail) => {
            mySQLConnector.pool.getConnection((err, connection) => {

                if (err) {
                    return fail(err)
                }

                connection.query(query, params, (err, rows) => {

                    connection.release()

                    if (err) {
                        return fail(err)
                    }

                    return succeed(rows)
                })
            })
        })
    }

    static createTransactionalQuery({query, params, connection}) {
        
        return new Promise((succeed, fail) => {

            connection.query(query, params, (err, rows) => {

                if (err) {
                    return fail(err)
                }

                return succeed(rows)
            })
        })
    }
    
    static rollback(connection) {

        return new Promise((succeed, fail) => {

            try {
                connection.rollback(() => succeed())
            } catch (e) {
                return fail(e)
            } finally {
                connection.release()
            }

        })
    }

    static commit(connection) {

        return new Promise((succeed, fail) => {

            try {
                connection.commit(err => { 
                    if (err) { 
                        return rollback(connection, err)
                    }

                    return succeed()
                })
            } catch (e) {
                return fail(e)
            } finally {
                connection.release()
            }

        })

    }

    static getConnectionFromPool() {
        return new Promise((succeed, fail) => {

            mySQLConnector.pool.getConnection((err, connection) => {

                if (err) {
                    return fail(err)
                }

                return succeed(connection)
            })
        })
    }

    static beginTransaction(connection) {
        return new Promise((succeed, fail) => {

            connection.beginTransaction(err => {

                if (err) {
                    return fail(err)
                }

                return succeed(connection)
            })
        })
    }
}