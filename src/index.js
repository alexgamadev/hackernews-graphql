import { ApolloServer } from 'apollo-server';

const typeDefs = `
    type Query {
        info: String!
    }
`;

const resolvers = {
    Query: {
        info: () => `Placeholder info`,
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server
    .listen(8000)
    .then(({url}) => console.log('Server listening on ' + url));