import { client } from "./server";

export const typeDefs = `
    type Room {
        id: String!
        name: String!
    }
    type Query {
        rooms: [Room]!
        room(name: String!): Room!
        hello: String
        hi: String
    }
    type Mutation {
        createRoom(name: String!): Boolean!
    }
`;

export const resolvers = {
    Query: {
        rooms: async () => {
            console.log("rooms");
            const rooms = await client.room.findMany();
            return rooms;
        },
        room: async (_, { name }) => {
            const room = await client.room.findUnique({ where: { name } });
            return room;
        },
        hello: () => {
            console.log("hello");
            return "hello";
        },
        hi: () => {
            console.log("hi");
            return "hi";
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
