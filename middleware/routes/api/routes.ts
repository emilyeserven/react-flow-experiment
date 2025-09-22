import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FastifyInstance } from "fastify";

import apiFilms from "./films.js";
import apiPokemon from "./pokemon.js";
import apiPokemonSpecific from "./pokemonSpecific.js";
import apiRoot from "./root.js";
import apiTest from "./test.js";

export default async function (server: FastifyInstance) {
  const fastify = server.withTypeProvider<JsonSchemaToTsProvider>();

  fastify.register(apiRoot);
  fastify.register(apiTest);
  fastify.register(apiFilms);
  fastify.register(apiPokemon);
  fastify.register(apiPokemonSpecific);
}
