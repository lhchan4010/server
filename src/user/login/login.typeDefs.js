export default `#graphql
    type loginResult {
        ok: Boolean!
        token: String
        error: String
    }
    type Mutation {
        login(email:String!, password:String!): loginResult!
    }
`;
