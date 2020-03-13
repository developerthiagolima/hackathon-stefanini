import { GraphQLServer, PubSub } from 'graphql-yoga'
import { default as typeDefs } from './types'
import { default as resolvers } from './resolvers'

const mysql = require('./dao/mysqlWrapper')
var load = require('express-load')
const bodyParser = require('body-parser')

const server = new GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context(request) {
        return{
            mysql,
            request
        } 
    }
})
server.express.use(bodyParser.json())
server.start(() => {
    console.log(`🚀 Server ready at http://localhost:4000`)
})

import { default as Router } from './routes/genericRouter'
Router.load(server.express, mysql, "candidato")
Router.load(server.express, mysql, "avaliador")
Router.load(server.express, mysql, "avaliacao")
Router.load(server.express, mysql, "pergunta")
Router.load(server.express, mysql, "grupo")
Router.load(server.express, mysql, "tipo_grupo")
Router.load(server.express, mysql, "tipo_pergunta")

import { default as ResultadoRouter } from './routes/resultadoRouter'
ResultadoRouter.load(server.express, mysql)