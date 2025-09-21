import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FastifyInstance } from "fastify";

export default async function (server: FastifyInstance) {
  const fastify = server.withTypeProvider<JsonSchemaToTsProvider>();

  fastify.get(
    "/films",
    async function (request, reply) {
      const initialRequest = await fetch("https://swapi.info/api/films").then(res => res.json());
      const finalData = [];
      initialRequest.forEach((film) => {
        finalData.push({
          id: film.episode_id,
          value: film.episode_id,
          label: film.title,
        });
      });
      return finalData;
    },
  );
}
