import { ApolloServer } from "@apollo/server";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { typeDefs, resolvers } from "./schema";
const PORT = process.env.PORT;
export const client = new PrismaClient();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        process.env.NODE_ENV === "production"
            ? ApolloServerPluginLandingPageProductionDefault({
                  graphRef: "my-graph-id@my-graph-variant",
                  footer: false,
              })
            : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
    introspection: true,
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
    });
    return console.log(`🚀 Server ready at ${url}`);
};

startServer();
