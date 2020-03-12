const DAO = require('../dao/dao')

export default {
    async listarAvaliador(app, req, res, done, mysql) {
        console.log(req.query);
        let dao = new DAO("avaliador", mysql)
        return dao.findByFields({
            ...req.query
        })
    },
    async salvarAvaliador(app, req, res, done, mysql) {
        console.log(req.body);
        let dao = new DAO("avaliador", mysql)
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
    async atualizarAvaliador(app, req, res, done, mysql) {
        console.log(req.body.id);
        console.log(req.body);
        let dao = new DAO("avaliador", mysql)
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
    async deletarAvaliador(app, req, res, done, mysql) {
        console.log(req.query);
        let dao = new DAO("avaliador", mysql)
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