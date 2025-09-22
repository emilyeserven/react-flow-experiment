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

export default async function (server: FastifyInstance) {
  const fastify = server.withTypeProvider<JsonSchemaToTsProvider>();

  fastify.get(
    "/pokemon",
    async function () {
      const initialRequest: pokemonApi = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=60").then(res => res.json());
      const apiData: pokemonObj[] = [];
      const selectData: SelectOption[] = [];
      initialRequest.results.forEach((mon: pokemonObj) => {
        selectData.push({
          id: mon.name,
          value: mon.name,
          label: mon.name,
        });
        apiData.push({
          name: mon.name,
          url: mon.url,
        });
      });
      return {
        selectData,
        apiData,
      };
    },
  );
}
