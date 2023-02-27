export default `#graphql
    type Receipt{
        id: Int!
        user: User!
        room: Room!
        type: String!
        price: Int!
        payment: String!
        checkIn: String!
        checkOut: String!
        createAt: String!
    }
`;
