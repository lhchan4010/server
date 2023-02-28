import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client } from "../../client";

export default {
    Mutation: {
        login: async (_, { email, password }) => {
            const user = await client.user.findUnique({ where: { email } });
            if (!user) {
                return { ok: false, error: "worng email" };
            }
            const isCorrectPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!isCorrectPassword) {
                return { ok: false, error: "worng password" };
            }
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            return { ok: true, token };
        },
    },
};
