import { client } from "../../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createAccount: async (_, { email, password, name }) => {
            try {
                const isExist = await client.user.findUnique({
                    where: { email },
                });
                if (isExist) {
                    return { ok: false, error: "this email is already taken" };
                }
                const hashPassword = await bcrypt.hash(password, 10);
                const user = await client.user.create({
                    data: {
                        email,
                        password: hashPassword,
                        name,
                    },
                });
                return { ok: true };
            } catch (error) {
                return {
                    ok: false,
                    error,
                };
            }
        },
    },
};
