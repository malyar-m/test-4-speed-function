const typeDefs = `
  #graphql

  type Earthquake {
    id: ID!
    location: String!
    magnitude: Float!
    date: String!
  }

  type Query {
    earthquakes: [Earthquake!]!
  }

  type Mutation {
    addEarthquake(location: String!, magnitude: Float!, date: String!): Earthquake!
    updateEarthquake(id: ID!, location: String, magnitude: Float, date: String): Earthquake!
    deleteEarthquake(id: ID!): Boolean!
  }
`;

export default typeDefs;
