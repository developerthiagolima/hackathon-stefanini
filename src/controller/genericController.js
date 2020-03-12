const DAO = require('../dao/dao')

export default {
    async listar(app, req, res, done, mysql, table_name) {
        console.log(req.query);
        let dao = new DAO(table_name, mysql)
        return await dao.findByFields({
            ...req.query
        })
    },
    async salvar(app, req, res, done, mysql, table_name) {
        console.log(req.body);
        let dao = new DAO(table_name, mysql)
        const connection = await mysql.getConnectionFromPool()
        try{
            let _result = await dao.insert(connection, {
                ...req.body
            })
            return dao.find(_result.insertId)
        }finally{
            if (connection != null) connection.release()
        }
    },
    async atualizar(app, req, res, done, mysql, table_name) {
        console.log(req.body.id);
        console.log(req.body);
        let dao = new DAO(table_name, mysql)
        const connection = await mysql.getConnectionFromPool()
        try{
            await dao.update(connection, {
                id: req.body.id,
                data: req.body
            })
            return dao.find(req.body.id)
        } finally {
            if (connection != null) connection.release()
        }
    },
    async deletar(app, req, res, done, mysql, table_name) {
        console.log(req.query);
        let dao = new DAO(table_name, mysql)
        const connection = await mysql.getConnectionFromPool()
        try{
            await dao.delete(connection, {
                id: req.query.id
            })
            return "OK"
        } finally {
            if (connection != null) connection.release()
        }
    },
}