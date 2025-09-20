import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FastifyInstance } from "fastify";

export default async function (server: FastifyInstance) {
  const fastify = server.withTypeProvider<JsonSchemaToTsProvider>();

  fastify.get(
    "/",
    async (request, reply) => {
      const testObj = {
        item: "Hello World, from API route!",
        fromEnv: fastify.config.VALUE,
      };
      return testObj;
    },
  );
}
