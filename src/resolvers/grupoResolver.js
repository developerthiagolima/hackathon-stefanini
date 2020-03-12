const DAO = require('../dao/dao')

export default {
    Query:{
        async listarGrupo(parent, args, { mysql, request }, info) {
            let dao = new DAO("grupo", mysql)
            return dao.findByFields({
                ...args
            })
        },
    },
  
    Mutation:{
        async criarGrupo(parent, args, { mysql, request }, info) {
            let dao = new DAO("grupo", mysql)
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
        async atualizarGrupo(parent, args, { mysql, request }, info) {
            let dao = new DAO("grupo", mysql)
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
        async deletarGrupo(parent, args, { mysql, request }, info) {
            let dao = new DAO("grupo", mysql)
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

    Grupo: {
        async tipo(parent, args, { mysql }, info) {
            return (await mysql.createQuery({
                query: `SELECT * FROM ?? WHERE id = ? LIMIT 1;`,
                params: ["tipo_grupo", parent.tipo_id]
            })).shift()
        },
    }
  }