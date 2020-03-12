const DAO = require('../dao/dao')

export default {
    Query:{
        async listarAvaliacao(parent, args, { mysql, request }, info) {
            let dao = new DAO("avaliacao", mysql)
            return dao.findByFields({
                ...args
            })
        },
        async obterResultado(parent, args, { mysql, request }, info) {
            let dao = new DAO("avaliacao", mysql)
            return dao.findByFields({
                ...args
            })
        },
    },
  
    Mutation:{
        async criarAvaliacao(parent, args, { mysql, request }, info) {
            let dao = new DAO("avaliacao", mysql)
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
        async atualizarAvaliacao(parent, args, { mysql, request }, info) {
            let dao = new DAO("avaliacao", mysql)
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
        async deletarAvaliacao(parent, args, { mysql, request }, info) {
            let dao = new DAO("avaliacao", mysql)
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

    Avaliacao:{
        async candidato(parent, args, { mysql }, info) {
            return (await mysql.createQuery({
                query: `SELECT * FROM ?? WHERE id = ? LIMIT 1;`,
                params: ["candidato", parent.candidato_id]
            })).shift()
        },
        async avaliador(parent, args, { mysql }, info) {
            return (await mysql.createQuery({
                query: `SELECT * FROM ?? WHERE id = ? LIMIT 1;`,
                params: ["avaliador", parent.avaliador_id]
            })).shift()
        },
        async pergunta(parent, args, { mysql }, info) {
            return (await mysql.createQuery({
                query: `SELECT * FROM ?? WHERE id = ? LIMIT 1;`,
                params: ["pergunta", parent.pergunta_id]
            })).shift()
        },
    },
  }