import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FastifyInstance } from "fastify";

interface SelectOption {
  id: string | number;
  value: string;
  label: string;
}

interface pokemonObj {
  name: string;
  url: string;
}

interface pokemonApi {
  count: number;
  next: string;
  previous: string;
  results: pokemonObj[];
}

const testSchema = {
  schema: {
    description: "It's like looking into a mirror...",
    params: {
      type: "object",
      properties: {
        mon: {
          type: "string",
        },
      },
      required: ["mon"],
    },
  },
} as const;

export default async function (server: FastifyInstance) {
  const fastify = server.withTypeProvider<JsonSchemaToTsProvider>();

  fastify.get(
    "/pokemon/:mon",
    testSchema,
    async function (request) {
      const {
        mon,
      } = request.params;
      const initialRequest: pokemonApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${mon}`).then(res => res.json());

      return initialRequest;
    },
  );
}
