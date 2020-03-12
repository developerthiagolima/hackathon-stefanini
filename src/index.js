import { GraphQLServer, PubSub } from 'graphql-yoga'
import { default as typeDefs } from './types'
import { default as resolvers } from './resolvers'

const mysql = require('./dao/mysqlWrapper')

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
server.start(() => {
    console.log(`🚀 Server ready at http://localhost:4000`)
})