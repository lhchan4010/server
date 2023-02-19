import { client } from "./server";

export const typeDefs = `
    type Room {
        id: String!
        name: String!
    }
    type Query {
        rooms: [Room]!
        room(name: String!): Room!
    }
    type Mutation {
        createRoom(name: String!): Boolean!
    }
`;

export const resolvers = {
    Query: {
        rooms: () => client.room.findMany(),
        room: async (_, { name }) => {
            const room = await client.room.findUnique({ where: { name } });
            return room;
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
