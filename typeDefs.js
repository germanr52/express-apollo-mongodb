const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Task {
    id: ID
    title: String
    description: String
  }

  type Query {
    hello: String
    goodBye: String
    getAllTasks: [Task]
    getTask(id: ID): Task
  }

  input TaskInput {
    title: String
    description: String
  }

  type Mutation {
    createTask(title: String, description: String): Task
    deleteTask(id: ID!): Task
    updateTask(id: ID!, task: TaskInput!): Task
  }
`;

module.exports = { typeDefs };
