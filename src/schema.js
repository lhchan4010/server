import { client } from "./server";

export const typeDefs = `
    type Room {
        id: String!
        name: String!
    }
    type Query {
        rooms: String
        room(name: String!): Room!
        hello: String
    }
    type Mutation {
        createRoom(name: String!): Boolean!
    }
`;

export const resolvers = {
    Query: {
        rooms: async () => {
            console.log("rooms");
            return "rooms";
        },
        room: async (_, { name }) => {
            const room = await client.room.findUnique({ where: { name } });
            return room;
        },
        hello: () => {
            console.log("hello");
            return "hello";
        },
    },
    Mutation: {
        createRoom: async (_, { name }) => {
            const room = await client.room.create({
                data: { name },
            });
            return Boolean(room);
        },
    },
};
