import { gql } from "apollo-server-express";

export default gql`
  type Categorie {
    id: ID!
    name: String!
    aprobed: Boolean
    createdAt: String!
    updatedAt: String!
  }
  extend type Query {
    categorie(id: ID!): Categorie
    categories: [Categorie!]
  }
  extend type Mutation {
    createCategorie(name: String!): Categorie @auth @hasRole(role: ADMIN)
  }
`;
