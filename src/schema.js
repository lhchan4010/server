import { client } from "./server";

export const typeDefs = `
    type Room {
        id: String!
        name: String!
    }
    type Query {
        room(name: String!): Room!
        hello: [Room]!
    }
    type Mutation {
        createRoom(name: String!): Boolean!
    }
`;

export const resolvers = {
    Query: {
        room: async (_, { name }) => {
            const room = await client.room.findUnique({ where: { name } });
            return room;
        },
        hello: async () => {
            console.log("rooms");
            const rooms = await client.room.findMany();
            return rooms;
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
