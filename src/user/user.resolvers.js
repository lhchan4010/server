import { client } from "../client";

export default {
    Query: {
        seeProfile: async (_, { email }) => {
            const user = await client.user.findUnique({
                where: { email },
            });
            return user;
        },
    },
};
