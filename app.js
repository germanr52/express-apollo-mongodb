import { config } from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { connectDB } from "./db.js";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";
import { WebSocketServer } from "ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";

config();

// require("dotenv").config();
// const express = require("express");
// const { ApolloServer } = require("apollo-server-express");
// const { typeDefs } = require("./typeDefs");
// const { resolvers } = require("./resolvers");
// const { connectDB } = require("./db");
// const { createServer } = require("http");
// const { WebSocketServer } = require("ws");
// const {
//   ApolloServerPluginDrainHttpServer,
// } = require("@apollo/server/plugin/drainHttpServer");

const app = express();

const httpServer = createServer(app);

connectDB();

//module.exports = app;

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  // path: "/subscriptions",
});

const serverCleanup = useServer({ schema }, wsServer);

async function start() {
  const apolloServer = new ApolloServer({
    // typeDefs: typeDefs,
    // resolvers,

    schema,

    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              console.log("No se...");
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  app.get("/", (req, res) => res.send("Welcome to my API"));

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.use("*", (req, res) => res.status(404).send("Page not found"));

  httpServer.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}.`)
  );
}

start();
