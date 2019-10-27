import { gql } from "apollo-server-express";

export default gql`
  scalar Date

  type Quote {
    id: ID!
    author: String!
    photo: String
    quote: String!
    likes: Int
    reference: String
    categorie: String!
    aprobed: Boolean
    createdAt: Date!
    updatedAt: Date!
  }
  extend type Query {
    quote(id: ID!): Quote
    quotes: [Quote!]
    limitQuote(limit: Int): [Quote!]
  }
  extend type Mutation {
    createQuote(
      author: String!
      photo: String
      quote: String!
      likes: Int
      reference: String
      categorie: String!
    ): Quote!
    modifyQuote(
      author: String
      photo: String
      quote: String
      likes: Int
      aprobed: Boolean
      reference: String
      categorie: String
    ): Boolean @auth @hasRole(role: ADMIN)
    deletedQuote(id: ID!): Boolean @auth @hasRole(role: ADMIN)
  }
`;
