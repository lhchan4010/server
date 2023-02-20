import { client } from "../client";

export default {
    Query: {
        rooms: async () => {
            const rooms = await client.room.findMany();
            return rooms;
        },
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
