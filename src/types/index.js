import { fileLoader, mergeTypes } from 'merge-graphql-schemas'

const path = require('path')
const typesArray = fileLoader(path.join(__dirname, "./*.graphql"));
const typesMerged = mergeTypes(typesArray, { all: false });

export default typesMerged;