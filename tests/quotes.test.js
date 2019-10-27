"use strict";
import chai from "chai";
import EasyGraphQLTester from "easygraphql-tester";

import schema from "../graphql/schemas/schemas";
import resolvers from "../graphql/resolvers/resolvers";
import schemaDirectives from "../graphql/directives/directives";

const { expect } = chai;

describe("Test Quotes queries, mutations and subscriptions ", () => {
  let tester;

  before(() => {
    tester = new EasyGraphQLTester(schema, resolvers, schemaDirectives);
  });

  it("Should return all the quotes", () => {
    const query = `
        query { 
          quotes {
            id,
            author,
            photo,
            quote,
            likes,
            reference,
            categorie,
            aprobed,
            createdAt,
            updatedAt
         }
        }
        `;

    tester.test(true, query);
  });

  it("Should return one quotes, parameter id", () => {
    const query = `
      query quote($id: ID!) { 
        quote(id: $id) {
          id,
            author,
            photo,
            quote,
            likes,
            reference,
            categorie,
            aprobed,
            createdAt,
            updatedAt
        }
      }
        `;

    tester.test(true, query, { id: "5db4d2fd0f1679d6cb4c29a5" });
  });

  it("Should return limit quotes, parameter limit", () => {
    const query = `
      query limitQuote($limit: Int) { 
        limitQuote(limit: $limit) {
            id,
            author,
            photo,
            quote,
            likes,
            reference,
            categorie,
            aprobed,
            createdAt,
            updatedAt
        }
      }
        `;

    tester.test(true, query, { limit: 3 });
  });

  it("Should pass if the mutation create quote is valid", () => {
    const mutation = `
          mutation createQuote(
            $author: String!
            $photo: String
            $quote: String!
            $likes: Int
            $reference: String
            $categorie: String!){
          createQuote(
            author: $author
            photo: $photo
            quote: $quote
            likes: $likes
            reference: $reference
            categorie: $categorie){
            author,
            photo,
            quote,
            likes,
            reference,
            categorie
          }
        }
    `;

    tester.test(true, mutation, {
      author: "Alejo Bianchi",
      photo:
        "https://avatars1.githubusercontent.com/u/18059992?s=400&u=a02f77a9f72b3ff0917c373093e42224af29cbf9&v=4",
      quote: "On my pc it works",
      likes: 666,
      reference: "https://github.com/Linusar",
      categorie: "celebrated"
    });
  });

  it("Should pass if the mutation modify quote is valid", () => {
    const mutation = `
          mutation modifyQuote(
            $author: String!
            $photo: String
            $quote: String!
            $likes: Int
            $reference: String
            $categorie: String!){
          modifyQuote(
            author: $author
            photo: $photo
            quote: $quote
            likes: $likes
            reference: $reference
            categorie: $categorie
          )
        }
    `;

    tester.test(true, mutation, {
      author: "Alejo Bianchi",
      photo:
        "https://avatars1.githubusercontent.com/u/18059992?s=400&u=a02f77a9f72b3ff0917c373093e42224af29cbf9&v=4",
      quote: "On my pc it works",
      likes: 666,
      reference: "https://github.com/Linusar",
      categorie: "celebrated"
    });
  });

  it("Should pass if the mutation deleted quote is valid", () => {
    const mutation = `
          mutation deletedQuote(
            $id: ID!){
          deletedQuote(
            id: $id
          )
        }
    `;

    tester.test(true, mutation, {
      id: "5db4d2fd0f1679d6cb4c29a5"
    });
  });
});
