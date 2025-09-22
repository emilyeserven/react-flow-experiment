import type { SelectOption } from "@/components/ui/combobox/Combobox.tsx";

export async function fetchTest() {
  return await fetch("http://localhost:3001/api").then(res => res.json());
}

export async function fetchFilms(): Promise<SelectOption[]> {
  return await fetch("http://localhost:3001/api/films").then(res => res.json());
}

interface pokemonObj {
  name: string;
  url: string;
}

interface PokemonData {
  selectData: SelectOption[];
  apiData: pokemonObj[];
}

export async function fetchPokemonAll(): Promise<PokemonData> {
  return await fetch("http://localhost:3001/api/pokemon").then(res => res.json());
}

interface PokemonSpecificData {
  sprites: {
    front_default: string;
  };
}
export async function fetchPokemon(mon: string): Promise<PokemonSpecificData> {
  console.log(mon);
  return await fetch(`http://localhost:3001/api/pokemon/${mon}`).then(res => res.json());
}
