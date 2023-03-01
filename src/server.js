import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { schema } from "./schema";
import jwt from "jsonwebtoken";
import { getUser } from "./user/users.utills";

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
    introspection: true,
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
        context: async ({ req }) => {
            const token = req.headers.token;
            if (token === "null") {
                return { loggedInUser: null };
            }
            return {
                loggedInUser: await getUser(req.headers.token),
            };
        },
    });
    return console.log(`🚀 Server ready at ${url}`);
};

startServer();
