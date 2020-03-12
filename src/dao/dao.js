const { sqlConstants } = require('./sqlConstants');

class DAO {

    constructor(tabela, mysql){
        this.TABLE_NAME = tabela
        this.mysql = mysql
    }

    get PRIMARY_KEY() {
        return "id"
    }

    async find(id) {
        return (await this.mysql.createQuery({
            query: `SELECT * FROM ?? WHERE ?? = ? LIMIT 1;`,
            params: [this.TABLE_NAME, this.PRIMARY_KEY, id]
        })).shift()
    }

    findAll() {
        return this.mysql.createQuery({
            query: `SELECT * FROM ??;`,
            params: [this.TABLE_NAME]
        });
    }

    findByFields(fields, limit, order) {
        let baseQuery = `SELECT * FROM ?? WHERE `
        let params = [this.TABLE_NAME]

        Object.keys(fields).forEach((key, index) => {
            if (fields[key].indexOf("%") !== -1 || fields[key] == ''){
                baseQuery += `${key} like ?`
            }else{
                baseQuery += `${key} = ?`
            }
            params.push(fields[key])
            if (index + 1 !== Object.keys(fields).length) baseQuery += " AND "
        })

        if (order != null && order.by != null && order.direction != null) {
            baseQuery += ` ORDER BY ??`
            baseQuery += order.direction === sqlConstants.DESC ? " DESC" : " ASC"
            params.push(order.by)
        }

        if (limit != null && !isNaN(limit)) {
            baseQuery += " LIMIT ?"
            params.push(limit)
        }

        return this.mysql.createQuery({
            query: baseQuery,
            params
        })
    }

    update(connection, {data, id}) {
        return this.mysql.createTransactionalQuery({
            query: `UPDATE ??
                    SET ?
                    WHERE ?? = ?;`,
            params: [this.TABLE_NAME, data, this.PRIMARY_KEY, id],
            connection
        })
    }

    insert(connection, data) {
        return this.mysql.createTransactionalQuery({
            query: `INSERT INTO ${this.TABLE_NAME}
                    SET ?;`,
            params: [data],
            connection
        })
    }

    delete(connection, {id}) {
        return this.mysql.createTransactionalQuery({
            query: `DELETE FROM  ??
                    WHERE ?? = ?;`,
            params: [this.TABLE_NAME,this.PRIMARY_KEY, id],
            connection
        })
    }
}

module.exports = DAO