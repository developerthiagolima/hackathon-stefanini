const DAO = require('../dao/dao')

export default {
    Query:{
        async listarTipoPergunta(parent, args, { mysql, request }, info) {
            let dao = new DAO("tipo_pergunta", mysql)
            return dao.findByFields({
                ...args
            })
        },
    },
  
    Mutation:{
        async criarTipoPergunta(parent, args, { mysql, request }, info) {
            let dao = new DAO("tipo_pergunta", mysql)
            const connection = await mysql.getConnectionFromPool()
            try{
                let _result = await dao.insert(connection, {
                    ...args.data
                })
                return dao.find(_result.insertId)
            }finally{
                if (connection != null) connection.release()
            }
        },
        async atualizarTipoPergunta(parent, args, { mysql, request }, info) {
            let dao = new DAO("tipo_pergunta", mysql)
            const connection = await mysql.getConnectionFromPool()
            try{
                await dao.update(connection, {
                    id: args.id,
                    data: args.data
                })
                return dao.find(args.id)
            } finally {
                if (connection != null) connection.release()
            }
        },
        async deletarTipoPergunta(parent, args, { mysql, request }, info) {
            let dao = new DAO("tipo_pergunta", mysql)
            const connection = await mysql.getConnectionFromPool()
            try{
                await dao.delete(connection, {
                    id: args.id
                })
                return "OK"
            } finally {
                if (connection != null) connection.release()
            }
        },
    },
  }