import jwt from "jsonwebtoken";
import { client } from "../client";

export const getUser = async (token) => {
    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findUnique({ where: { id } });
        console.log(user);
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.log("getUser Error");
        return null;
    }
};

export const protectResolver = (ourResolver) => (root, arg, context, info) => {
    if (!context.loggedInUser) {
        const query = info.operation.operation === "query";
        if (query) {
            return null;
        } else {
            return { ok: false, error: "you need to LogIn" };
        }
    }
    return ourResolver(root, arg, context, info);
};
