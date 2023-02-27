import { client } from "../client";

export default {
    Query: {
        seeProfile: (_, { email }) => {
            const user = client.user.findUnique({
                where: { email },
            });
            return user;
        },
    },
};
