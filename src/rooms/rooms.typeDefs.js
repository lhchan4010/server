import { graphql } from "graphql";

export default `#graphql
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
