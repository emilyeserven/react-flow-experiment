import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FastifyInstance } from "fastify";

interface SelectOption {
  id: string | number;
  value: string;
  label: string;
}

interface swapiFilm {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export default async function (server: FastifyInstance) {
  const fastify = server.withTypeProvider<JsonSchemaToTsProvider>();

  fastify.get(
    "/films",
    async function () {
      const initialRequest = await fetch("https://swapi.info/api/films").then(res => res.json());
      const finalData: SelectOption[] = [];
      initialRequest.forEach((film: swapiFilm) => {
        finalData.push({
          id: film.episode_id,
          value: film.episode_id + "",
          label: film.title,
        });
      });
      return finalData;
    },
  );
}
