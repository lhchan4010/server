export default `#graphql
    type Room {
        id: Int!
        name: String!
        floor: Int!
        isUsed: Boolean!
        isClean: Boolean!
        user: User
    }
    type Query {
        rooms: [Room]!
        room(name: String!): Room!
    }
    type Mutation {
        createRoom(name: String!): Boolean!
    }
`;
