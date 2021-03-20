import { ApolloServer } from 'apollo-server';
import fs from 'fs';
import path from 'path';

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

const typeDefs = fs.readFileSync(
    new URL('schema.graphql', import.meta.url),
    'utf8',
);

let idCount = links.length;
const resolvers = {
    Query: {
        info: () => `Placeholder info`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            };
            links.push(link);
            return link;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server
    .listen(8000)
    .then(({url}) => console.log('Server listening on ' + url));