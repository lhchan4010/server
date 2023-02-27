import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema";

const PORT = process.env.PORT;

const server = new ApolloServer({
    schema,
    introspection: true,
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
    });
    return console.log(`🚀 Server ready at ${url}`);
};

startServer();
