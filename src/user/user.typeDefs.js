export default `#graphql
    type User {
        id: Int!
        name: String!
        email: String!
        password: String!
        createdAt: String!
        avatar: String
        room: [Room]
    }
    type Query {
        seeProfile(email: String!): User!
    }
`;
