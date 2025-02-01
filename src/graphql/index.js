// src/graphql/index.js
const { gql } = require('apollo-server-express');
const db = require('../models/db');

// Definir el esquema de GraphQL
const typeDefs = gql`
  type RandomBag {
    random_bag_id: Int!
    store_id: Int!
    description: String!
    total_price: Float!
    discount_price: Float
    pick_up_time: String
    available: Boolean!
    created_at: String!
    updated_at: String!
    deleted_at: String
  }

  input RandomBagInput {
    store_id: Int!
    description: String!
    total_price: Float!
    discount_price: Float
    pick_up_time: String
    available: Boolean!
  }

  type Query {
    randomBags: [RandomBag]
  }

  type Mutation {
    createRandomBag(input: RandomBagInput!): RandomBag
  }
`;

// Resolvers para manejar las consultas y mutaciones
const resolvers = {
  Query: {
    randomBags: async () => {
      const result = await db.query('SELECT * FROM random_bag');
      return result.rows;
    },
  },
  Mutation: {
    createRandomBag: async (_, { input }) => {
      const {
        store_id,
        description,
        total_price,
        discount_price,
        pick_up_time,
        available,
      } = input;

      const result = await db.query(
        `INSERT INTO random_bag (
          store_id, description, total_price, discount_price, pick_up_time, available
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [store_id, description, total_price, discount_price, pick_up_time, available]
      );

      return result.rows[0];
    },
  },
};

module.exports = { typeDefs, resolvers }; // Exporta typeDefs y resolvers por separado