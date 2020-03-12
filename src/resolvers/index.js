import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

const path = require('path')
const resolversArray = fileLoader(path.join(__dirname, "./*Resolver.js"));

const resolvers = mergeResolvers(resolversArray);
export default resolvers;