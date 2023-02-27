import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { schema } from "./schema";

const PORT = process.env.PORT;

const server = new ApolloServer({
    schema,
    plugins: [
        process.env.NODE_ENV === "production"
            ? ApolloServerPluginLandingPageProductionDefault({
                  graphRef: "my-graph-id@my-graph-variant",
                  footer: false,
              })
            : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
    });
    return console.log(`🚀 Server ready at ${url}`);
};

startServer();
