const DAO = require('../dao/dao')

export default {
    Query:{
        async listarPerfil(parent, args, { mysql, request }, info) {
            let dao = new DAO("perfil", mysql)
            return dao.findByFields({
                ...args,
                flativo: "S"
            })
        },
    },
  
    Mutation:{
        async criarPerfil(parent, args, { mysql, request }, info) {
            let dao = new DAO("perfil", mysql)
            const connection = await mysql.getConnectionFromPool()
            try{
                let _result = await dao.insert(connection, {
                    ...args.data,
                    flativo: "S"
                })
                return dao.find(_result.insertId)
            }finally{
                if (connection != null) connection.release()
            }
        },
        async atualizarPerfil(parent, args, { mysql, request }, info) {
            let dao = new DAO("perfil", mysql)
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
        async deletarPerfil(parent, args, { mysql, request }, info) {
            let dao = new DAO("perfil", mysql)
            const connection = await mysql.getConnectionFromPool()
            try{
                await dao.update(connection, {
                    id: args.id,
                    data: {
                        flativo: "N"
                    }
                })
                return "OK"
            } finally {
                if (connection != null) connection.release()
            }
        },
    },
  }