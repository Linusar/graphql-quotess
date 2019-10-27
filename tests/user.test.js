"use strict";
import chai from "chai";
import EasyGraphQLTester from "easygraphql-tester";

import schema from "../graphql/schemas/schemas";
import resolvers from "../graphql/resolvers/resolvers";
import schemaDirectives from "../graphql/directives/directives";

const { expect } = chai;

describe("Test User queries, mutations and subscriptions ", () => {
  let tester;

  before(() => {
    tester = new EasyGraphQLTester(schema, resolvers, schemaDirectives);
  });

  it("Should return all the users", () => {
    const query = `
        query { 
          users {
            id,
            email,
            username,
            password,
            name,
            role,
            isVerified,
            createdAt,
            updatedAt
         }
        }
        `;

    tester.test(true, query);
  });

  it("Should return one user, parameter id", () => {
    const query = `
      query user($id: ID!) { 
        user(id: $id) {
          id,
          email,
          username,
          password,
          name,
          role,
          isVerified,
          createdAt,
          updatedAt
        }
      }
        `;

    tester.test(true, query, { id: "5db4d2fd0f1679d6cb4c29a5" });
  });

  it("Should pass if the mutation singup user is valid", () => {
    const mutation = `
          mutation signUp(
              $email: String!
              $username: String!
              $name: String!
              $password: String!
            ){
              signUp(
                email: $email
                username: $username
                name: $name
                password: $password
              ){
                email,
                username,
                name,
                password
              }
            }
    `;

    tester.test(true, mutation, {
      email: "alejobianchi@fakeemail.io",
      username: "fakeusername",
      name: "Alejo",
      password: "fakepassword"
    });
  });

  it("Should pass if the mutation verify user is valid", () => {
    const mutation = `
          mutation verifyUser(
            $token: String!
          ){
            verifyUser(
              token: $token
            )
          }
    `;

    tester.test(true, mutation, { token: "f62ea82af39c27b59cfd915a2c3116b9" });
  });

  it("Should pass if the mutation verify user for admin is valid", () => {
    const mutation = `
          mutation verifyUserForAdmin(
            $id: ID!
            $isVerified: Boolean!
          ){
            verifyUserForAdmin(
              id: $id
              isVerified: $isVerified
            )
          }
    `;

    tester.test(true, mutation, {
      id: "5db4d2fd0f1679d6cb4c29a5",
      isVerified: true
    });
  });

  it("Should pass if the mutation resend sign up token is valid", () => {
    const mutation = `
          mutation resendSignUpToken(
            $email: String!
          ){
            resendSignUpToken(
              email: $email
            )
          }
    `;

    tester.test(true, mutation, {
      email: "alejobianchi@fakeemail.io"
    });
  });

  it("Should pass if the mutation change password is valid", () => {
    const mutation = `
          mutation ChangePassword(
            $password: String!
            $newPassword: String!
          ){
            ChangePassword(
              password: $password
              newPassword: $newPassword
            )
          }
    `;

    tester.test(true, mutation, {
      password: "OldPassword",
      newPassword: "NewPassword"
    });
  });

  it("Should pass if the mutation change password with token is valid", () => {
    const mutation = `
          mutation ChangePasswordWithToken(
            $token: String!
            $newPassword: String!
          ){
            ChangePasswordWithToken(
              token: $token
              newPassword: $newPassword
            )
          }
    `;

    tester.test(true, mutation, {
      token: "f62ea82af39c27b59cfd915a2c3116b9",
      newPassword: "NewPassword"
    });
  });

  it("Should pass if the mutation forgot password is valid", () => {
    const mutation = `
          mutation forgotPassword(
            $email: String!
          ){
            forgotPassword(
              email: $email
            )
          }
    `;

    tester.test(true, mutation, {
      email: "alejobianchi@fakeemail.io"
    });
  });
});
