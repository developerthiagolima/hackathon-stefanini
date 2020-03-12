const DAO = require('../dao/dao')

export default {
    Query:{
        async listarCandidato(parent, args, { mysql, request }, info) {
            let dao = new DAO("candidato", mysql)
            return dao.findByFields({
                ...args
            })
        },
    },
  
    Mutation:{
        async criarCandidato(parent, args, { mysql, request }, info) {
            let dao = new DAO("candidato", mysql)
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
        async atualizarCandidato(parent, args, { mysql, request }, info) {
            let dao = new DAO("candidato", mysql)
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
        async deletarCandidato(parent, args, { mysql, request }, info) {
            let dao = new DAO("candidato", mysql)
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

    Candidato:{
        async grupo(parent, args, { mysql }, info) {
            return (await mysql.createQuery({
                query: `SELECT * FROM ?? WHERE id = ? LIMIT 1;`,
                params: ["grupo", parent.grupo_id]
            })).shift()
        },
    },
  }