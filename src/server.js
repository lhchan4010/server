import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { typeDefs, resolvers } from "./schema";
const PORT = process.env.PORT;
export const client = new PrismaClient();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
    });
    return console.log(`🚀 Server ready at ${url}`);
};

startServer();
