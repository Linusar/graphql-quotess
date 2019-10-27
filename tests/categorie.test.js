"use strict";
import chai from "chai";
import EasyGraphQLTester from "easygraphql-tester";

import schema from "../graphql/schemas/schemas";
import resolvers from "../graphql/resolvers/resolvers";
import schemaDirectives from "../graphql/directives/directives";

const { expect } = chai;

describe("Test Categorie queries, mutations and subscriptions ", () => {
  let tester;

  before(() => {
    tester = new EasyGraphQLTester(schema, resolvers, schemaDirectives);
  });

  it("Should return all the categories", () => {
    const query = `
        query { 
          categories {
          id,
          name,
          aprobed
         }
        }
        `;

    tester.test(true, query);
  });

  it("Should return one category, parameter id", () => {
    const query = `
      query categorie($id: ID!) { 
          categorie(id: $id) {
          id,
          name,
          aprobed
        }
      }
        `;

    tester.test(true, query, { id: "5db4d2fd0f1679d6cb4c29a5" });
  });

  it("Should pass if the mutation create category is valid", () => {
    const mutation = `
        mutation createCategorie(
          $name: String!){
        createCategorie(
          name: $name){
            id,
            name,
            aprobed,
            createdAt,
            updatedAt
        }
      }
    `;
    tester.test(true, mutation, {
      name: "Prueba"
    });
  });
});
