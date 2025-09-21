import type { SelectOption } from "@/components/ui/Combobox.tsx";

export async function fetchTest() {
  return await fetch("http://localhost:3001/api").then(res => res.json());
}

export async function fetchFilms(): Promise<SelectOption[]> {
  return await fetch("http://localhost:3001/api/films").then(res => res.json());
}
