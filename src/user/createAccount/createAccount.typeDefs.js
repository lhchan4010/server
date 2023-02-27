export default `#graphql
    type mutationResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        createAccount(email: String!, password: String!, name: String): mutationResult
    }
`;
