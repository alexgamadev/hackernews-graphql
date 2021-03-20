import { ApolloServer } from 'apollo-server';
import fs, { link } from 'fs';

//Prisma
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const prisma = new PrismaClient();

const typeDefs = fs.readFileSync(
    new URL('schema.graphql', import.meta.url),
    'utf8',
);

const resolvers = {
    Query: {
        info: () => `Placeholder info`,
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany()
        },
    },
    Mutation: {
        post: (parent, args, context) => {
            const link = context.prisma.link.create({
                data: {
                    description: args.description,
                    url: args.url,
                }
            });
            return link;
        },
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