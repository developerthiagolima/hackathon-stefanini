import { GraphQLServer, PubSub } from 'graphql-yoga'
import { default as typeDefs } from './types'
import { default as resolvers } from './resolvers'

const mysql = require('./dao/mysqlWrapper')
const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context(request) {
        return{
            mysql,
            request,
            pubsub
        } 
    }
})
server.start(() => {
    console.log(`🚀 Server ready at http://localhost:4000`)
})