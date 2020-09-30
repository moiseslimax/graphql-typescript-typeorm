import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { createConnection } from "typeorm";
import * as path from "path";
import * as fs from "fs";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";

const schemas: GraphQLSchema[] = [];
const folders = fs.readdirSync(path.join(__dirname, "./modules"));
folders.forEach((folder) => {
  const { resolvers } = require(`./modules/${folder}/resolvers`);

  const typeDefs = importSchema(
    path.join(__dirname, `./modules/${folder}/schema.graphql`)
  );

  schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
});

const schema: any = mergeSchemas({ schemas });
const server = new GraphQLServer({ schema });

createConnection().then(() => {
  server.start(() => console.log("Server is running on localhost:4000"));
});
