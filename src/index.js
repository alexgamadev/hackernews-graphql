import { ApolloServer } from 'apollo-server';
import fs, { link } from 'fs';

//Prisma
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const prisma = new PrismaClient();

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
        link: (parent, args) => {
            return links.find(link => args.id === link.id);
        }
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
        },
        updateLink: (parent, args) => {
            const linkIndex = links.findIndex(link => args.id === link.id);
            const link = {...links[linkIndex]};
            link.url = args.url ?? link.url;
            link.description = args.description ?? link.description;
            links[linkIndex] = link;
            return links[linkIndex];
        },
        deleteLink: (parent, args) => {
            const linkIndex = links.findIndex(link => args.id === link.id);
            if(linkIndex !== -1) {
                const link = links.splice(linkIndex, 1);
                console.log(link);
                return link[0];
            }

        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        prisma,
    }
})

server
    .listen(8000)
    .then(({url}) => console.log('Server listening on ' + url));