import type { SelectOption } from "@/components/ui/combobox/Combobox.tsx";

export async function fetchTest() {
  return await fetch("http://localhost:3001/api").then(res => res.json());
}

export async function fetchFilms(): Promise<SelectOption[]> {
  return await fetch("http://localhost:3001/api/films").then(res => res.json());
}

export async function fetchPokemon(): Promise<SelectOption[]> {
  return await fetch("http://localhost:3001/api/pokemon").then(res => res.json());
}
