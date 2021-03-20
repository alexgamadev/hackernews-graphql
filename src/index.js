import { ApolloServer } from 'apollo-server';

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

const typeDefs = `
    type Query {
        info: String!
        feed: [Link!]!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }
`;

const resolvers = {
    Query: {
        info: () => `Placeholder info`,
        feed: () => links,
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server
    .listen(8000)
    .then(({url}) => console.log('Server listening on ' + url));